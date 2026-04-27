import os

from django.conf import settings

try:
    from langchain_openai import OpenAIEmbeddings
except ImportError as exc:
    raise ImportError(
        "langchain-openai 패키지가 필요합니다. `pip install langchain-openai`를 실행해주세요."
    ) from exc


def get_openai_api_key() -> str:
    api_key = getattr(settings, "OPENAI_API_KEY", "") or os.getenv("OPENAI_API_KEY", "")
    if not api_key:
        raise ValueError(
            "OPENAI_API_KEY가 설정되지 않았습니다. backend/.env 또는 프로젝트 루트 .env에 추가해주세요."
        )
    return api_key


def get_embeddings() -> OpenAIEmbeddings:
    return OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=get_openai_api_key(),
    )
