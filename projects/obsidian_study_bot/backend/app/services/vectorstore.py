from pathlib import Path

from django.conf import settings

from app.models import Note
from app.services.chunker import split_markdown_text
from app.services.embeddings import get_embeddings

try:
    from langchain_community.vectorstores import FAISS
except ImportError as exc:
    raise ImportError(
        "langchain-community와 faiss-cpu 패키지가 필요합니다. "
        "`pip install langchain-community faiss-cpu`를 실행해주세요."
    ) from exc


_VECTORSTORE_CACHE: dict[int, FAISS] = {}


def _vectorstore_dir(note_id: int) -> Path:
    return Path(settings.MEDIA_ROOT) / "vectorstores" / f"note_{note_id}"


def create_or_update_vectorstore(note: Note) -> FAISS:
    chunks = split_markdown_text(note.content)
    if not chunks:
        raise ValueError(f"Note(id={note.id})에 임베딩할 Markdown 내용이 없습니다.")

    metadatas = [
        {"note_id": note.id, "chunk_index": index, "title": note.title}
        for index, _ in enumerate(chunks)
    ]
    vectorstore = FAISS.from_texts(
        texts=chunks,
        embedding=get_embeddings(),
        metadatas=metadatas,
    )

    store_dir = _vectorstore_dir(note.id)
    store_dir.mkdir(parents=True, exist_ok=True)
    vectorstore.save_local(str(store_dir))
    _VECTORSTORE_CACHE[note.id] = vectorstore
    return vectorstore


def load_vectorstore(note_id: int) -> FAISS:
    if note_id in _VECTORSTORE_CACHE:
        return _VECTORSTORE_CACHE[note_id]

    store_dir = _vectorstore_dir(note_id)
    if not store_dir.exists():
        note = Note.objects.filter(id=note_id).first()
        if note is None:
            raise ValueError(f"Note(id={note_id})를 찾을 수 없습니다.")
        return create_or_update_vectorstore(note)

    vectorstore = FAISS.load_local(
        str(store_dir),
        get_embeddings(),
        allow_dangerous_deserialization=True,
    )
    _VECTORSTORE_CACHE[note_id] = vectorstore
    return vectorstore


def search_similar_chunks(note_id: int, question: str, k: int = 3) -> list[str]:
    if not question or not question.strip():
        raise ValueError("질문 내용이 비어 있습니다.")

    vectorstore = load_vectorstore(note_id)
    docs = vectorstore.similarity_search(question, k=k)
    return [doc.page_content for doc in docs]
