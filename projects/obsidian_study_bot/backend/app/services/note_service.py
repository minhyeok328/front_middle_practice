from pathlib import Path

from django.core.files import File

from app.models import Note
from app.services.markdown_loader import load_markdown_file, load_markdown_text
from app.services.vectorstore import create_or_update_vectorstore


def _create_note(title: str, markdown_text: str, file_obj: File | None = None, file_name: str = "") -> Note:
    if not title or not title.strip():
        raise ValueError("노트 제목이 비어 있습니다.")

    content = load_markdown_text(markdown_text)
    if not content.strip():
        raise ValueError("Markdown 내용이 비어 있습니다.")

    note = Note(title=title.strip(), content=content, file_name=file_name)
    if file_obj is not None:
        note.file.save(file_name, file_obj, save=False)
    note.save()
    create_or_update_vectorstore(note)
    return note


def create_note_from_markdown(title: str, markdown_text: str) -> Note:
    return _create_note(title=title, markdown_text=markdown_text)


def create_note_from_file(title: str, file_path: str) -> Note:
    path = Path(file_path)
    content = load_markdown_file(path)
    with path.open("rb") as raw_file:
        return _create_note(
            title=title,
            markdown_text=content,
            file_obj=File(raw_file),
            file_name=path.name,
        )


def create_note_from_uploaded_file(title: str, uploaded_file) -> Note:
    try:
        content = uploaded_file.read().decode("utf-8")
    except UnicodeDecodeError as exc:
        raise ValueError("업로드한 Markdown 파일을 UTF-8로 읽을 수 없습니다.") from exc
    finally:
        uploaded_file.seek(0)

    return _create_note(
        title=title,
        markdown_text=content,
        file_obj=uploaded_file,
        file_name=uploaded_file.name,
    )
