# 📌 DevVault (Phase 0)

> Obsidian Markdown 기반 개인 개발 노트를 관리하고,  
> 향후 RAG 기반 질의응답 기능으로 확장하는 웹 애플리케이션

---

## 1. 프로젝트 개요

DevVault는 개발자가 작성한 Markdown(`.md`) 노트를 업로드하고,  
이를 웹에서 관리 및 조회할 수 있는 개인 지식 관리 서비스입니다.

Phase 0에서는 RAG 기능을 완전히 구현하기보다,  
**프론트엔드 + Django 백엔드 구조를 구축하고  
노트 관리 및 기본 API 흐름을 완성하는 것**을 목표로 합니다.

---

## 2. 프로젝트 목표 (Phase 0)

- React + TypeScript 기반 프론트엔드 구조 설계
- Django 기반 백엔드 API 서버 구축
- Markdown 파일 업로드 및 저장 기능 구현
- 노트 목록 / 상세 조회 기능 구현
- 향후 RAG 파이프라인 확장을 위한 구조 설계

---

## 3. 기술 스택

### Frontend

- React
- Vite
- TypeScript

### Backend

- Django

### Database

- SQLite (Django 기본 DB)

### Storage

- 로컬 파일 시스템 (`media` 폴더)

---

## 4. 시스템 아키텍처

```text
[Frontend]
React + Vite + TypeScript
        ↓ HTTP
[Backend]
Django
        ↓
[Database]
SQLite

[File Storage]
Local media folder (.md files)
```

---

## 5. 핵심 기능 (Phase 0)

### 1) Markdown 파일 업로드

- 사용자가 `.md` 파일 업로드
- Django에서 파일 저장 및 내용 파싱

### 2) 노트 관리

- 노트 목록 조회
- 노트 상세 조회 (Markdown 렌더링)

### 3) 기본 질문 API (Placeholder)

- 사용자 질문 입력 UI
- Django에서 임시 응답 반환
- 추후 RAG 연결 예정

---

## 6. 데이터 흐름

### 📂 노트 업로드

```text
사용자 → md 파일 업로드
→ Django에서 파일 저장
→ 파일 내용 읽기
→ DB에 저장
```

### 💬 질문 처리 (Phase 0)

```text
사용자 질문 입력
→ Django API 요청
→ 임시 응답 반환
```

---

## 7. 프로젝트 구조 (초안)

### Frontend

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── hooks/
│   └── types/
```

### Backend

```text
backend/
├── app/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── services/
├── media/
└── db.sqlite3
```

### ERD

```Mermaid
erDiagram
    NOTE ||--o{ CHAT_MESSAGE : references

    NOTE {
        int id PK
        string title
        text content
        string file
        string file_name
        datetime created_at
        datetime updated_at
    }

    CHAT_MESSAGE {
        int id PK
        int note_id FK
        text question
        text answer
        datetime created_at
    }
```


---

## 8. 향후 확장 계획

### Phase 1 (RAG 도입)

- Markdown -> Chunk 분할
- Embedding 생성
- Vector DB 도입 (Chroma / pgvector)
- 유사도 기반 문서 검색
- LLM 기반 답변 생성
- 출처 기반 응답 제공

### Phase 2

- PostgreSQL 도입
- 인증/사용자 관리
- 채팅 히스토리 관리

### Phase 3

- 배포 (Docker / Cloud)
- 성능 최적화
- UI/UX 고도화

---

## 9. 개발 원칙

- Phase별로 기능을 분리하여 점진적으로 확장
- 기능 구현과 구조 설계를 동시에 고려
- 불필요한 기술 스택은 초기 단계에서 배제
- RAG 기능은 구조만 설계하고 이후 단계에서 통합

---

## 10. 프로젝트 한 줄 정의

> Markdown 기반 개발 노트를 웹에서 관리하고,  
> 향후 AI 질의응답으로 확장 가능한 개인 지식 시스템

---

## 11. 실행 방법 (Phase 0 기준)

아래 명령어는 초기 세팅 후 로컬에서 프론트/백엔드를 실행하기 위한 기본 흐름입니다.

### Frontend (React + Vite + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

- 기본 개발 서버: `http://localhost:5173`

### Backend (Django)

```bash
cd backend
python -m venv .venv
# Windows (PowerShell)
.venv\Scripts\Activate.ps1
pip install django
python manage.py migrate
python manage.py runserver
```

- 기본 API 서버: `http://127.0.0.1:8000`

### 개발 메모

- Phase 0에서는 SQLite와 로컬 `media` 폴더를 사용
- 질문 API는 Placeholder 응답 기준으로 먼저 연결
- RAG 관련 의존성은 Phase 1에서 도입
