# Backend RAG 테스트 가이드

## 설치

```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

프로젝트 루트 `.env` 또는 `backend/.env`에 OpenAI API 키를 설정합니다.

```env
OPENAI_API_KEY=your_api_key_here
```

## 마이그레이션

```bash
cd backend
python manage.py migrate
```

## Django shell 테스트

```bash
cd backend
python manage.py shell
```

```python
from app.services.note_service import create_note_from_markdown
from app.services.rag_chain import answer_question

note = create_note_from_markdown(
    title="테스트 문서",
    markdown_text="""
# 테스트 문서

이 문서는 Markdown 기반 RAG 테스트 문서입니다.

## 목표
- Markdown 읽기
- chunking
- embedding
- FAISS 검색
- LLM 답변 생성
"""
)

answer = answer_question(note.id, "이 문서의 목표는 뭐야?")
print(answer)
```

## API 테스트

서버 실행:

```bash
python manage.py runserver
```

Markdown content로 노트 생성:

```bash
curl -X POST http://127.0.0.1:8000/api/notes/ ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"테스트 문서\",\"content\":\"# 테스트 문서\n\nMarkdown 기반 RAG 테스트입니다.\"}"
```

파일 업로드로 노트 생성:

```bash
curl -X POST http://127.0.0.1:8000/api/notes/ ^
  -F "title=파일 테스트" ^
  -F "file=@C:\path\to\note.md"
```

질문하기:

```bash
curl -X POST http://127.0.0.1:8000/api/chat/ ^
  -H "Content-Type: application/json" ^
  -d "{\"note_id\":1,\"question\":\"이 문서의 목표는 뭐야?\"}"
```

노트 목록:

```bash
curl http://127.0.0.1:8000/api/notes/
```

대화 기록:

```bash
curl http://127.0.0.1:8000/api/notes/1/messages/
```
