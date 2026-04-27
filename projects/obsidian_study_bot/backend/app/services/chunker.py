try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter
except ImportError as exc:
    raise ImportError(
        "langchain-text-splitters 패키지가 필요합니다. "
        "`pip install langchain-text-splitters`를 실행해주세요."
    ) from exc


def split_markdown_text(text: str) -> list[str]:
    if not text or not text.strip():
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )
    return splitter.split_text(text)
