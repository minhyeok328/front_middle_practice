from app.models import ChatMessage, Note
from app.services.embeddings import get_openai_api_key
from app.services.vectorstore import search_similar_chunks

try:
    from langchain_core.messages import HumanMessage, SystemMessage
    from langchain_openai import ChatOpenAI
except ImportError as exc:
    raise ImportError(
        "langchain-openai와 langchain 패키지가 필요합니다. "
        "`pip install langchain langchain-openai`를 실행해주세요."
    ) from exc


NO_CONTEXT_ANSWER = "관련 문맥을 찾지 못했습니다. 먼저 노트를 등록하고 vectorstore를 생성해주세요."


def _get_chat_model() -> ChatOpenAI:
    return ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        openai_api_key=get_openai_api_key(),
    )


def answer_question(note_id: int, question: str) -> str:
    note = Note.objects.filter(id=note_id).first()
    if note is None:
        raise ValueError(f"Note(id={note_id})를 찾을 수 없습니다.")
    if not question or not question.strip():
        raise ValueError("질문 내용이 비어 있습니다.")

    chunks = search_similar_chunks(note_id=note_id, question=question, k=3)
    context = "\n\n---\n\n".join(chunks).strip()

    if not context:
        ChatMessage.objects.create(note=note, question=question, answer=NO_CONTEXT_ANSWER)
        return NO_CONTEXT_ANSWER

    messages = [
        SystemMessage(
            content=(
                "You answer questions using only the provided Markdown context. "
                "If the context is insufficient, say so clearly in Korean."
            )
        ),
        HumanMessage(
            content=(
                f"Context:\n{context}\n\n"
                f"Question:\n{question}\n\n"
                "Answer in Korean, concisely and helpfully."
            )
        ),
    ]
    response = _get_chat_model().invoke(messages)
    answer = str(response.content).strip()

    ChatMessage.objects.create(note=note, question=question, answer=answer)
    return answer
