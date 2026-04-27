from pathlib import Path


def load_markdown_file(file_path: str | Path) -> str:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Markdown 파일을 찾을 수 없습니다: {path}")
    if not path.is_file():
        raise ValueError(f"Markdown 파일 경로가 아닙니다: {path}")

    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError as exc:
        raise ValueError(f"Markdown 파일을 UTF-8로 읽을 수 없습니다: {path}") from exc
    except OSError as exc:
        raise OSError(f"Markdown 파일을 읽는 중 오류가 발생했습니다: {path}") from exc


def load_markdown_text(markdown_text: str) -> str:
    if markdown_text is None:
        raise ValueError("Markdown 내용이 비어 있습니다.")
    return markdown_text
