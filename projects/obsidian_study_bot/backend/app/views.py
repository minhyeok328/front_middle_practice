import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from app.models import ChatMessage, Note
from app.services.note_service import create_note_from_markdown, create_note_from_uploaded_file
from app.services.rag_chain import answer_question


def _error_response(message: str, status: int = 400) -> JsonResponse:
    return JsonResponse({"error": message}, status=status, json_dumps_params={"ensure_ascii": False})


def _note_to_dict(note: Note) -> dict:
    return {
        "id": note.id,
        "title": note.title,
        "content": note.content,
        "file": note.file.url if note.file else "",
        "file_name": note.file_name,
        "created_at": note.created_at.isoformat(),
        "updated_at": note.updated_at.isoformat(),
    }


def _message_to_dict(message: ChatMessage) -> dict:
    return {
        "id": message.id,
        "note_id": message.note_id,
        "question": message.question,
        "answer": message.answer,
        "created_at": message.created_at.isoformat(),
    }


@csrf_exempt
def notes(request):
    if request.method == "GET":
        note_list = Note.objects.order_by("-created_at")
        return JsonResponse(
            {"notes": [_note_to_dict(note) for note in note_list]},
            json_dumps_params={"ensure_ascii": False},
        )

    if request.method == "POST":
        try:
            title = request.POST.get("title", "").strip()
            uploaded_file = request.FILES.get("file")

            if uploaded_file is not None:
                note = create_note_from_uploaded_file(title=title, uploaded_file=uploaded_file)
            else:
                if request.content_type.startswith("application/json"):
                    payload = json.loads(request.body.decode("utf-8") or "{}")
                    title = str(payload.get("title", "")).strip()
                    content = str(payload.get("content", ""))
                else:
                    content = request.POST.get("content", "")
                note = create_note_from_markdown(title=title, markdown_text=content)

            return JsonResponse(
                {"note": _note_to_dict(note)},
                status=201,
                json_dumps_params={"ensure_ascii": False},
            )
        except Exception as exc:
            return _error_response(str(exc), status=400)

    return _error_response("지원하지 않는 HTTP method입니다.", status=405)


@csrf_exempt
def chat(request):
    if request.method != "POST":
        return _error_response("지원하지 않는 HTTP method입니다.", status=405)

    try:
        if request.content_type.startswith("application/json"):
            payload = json.loads(request.body.decode("utf-8") or "{}")
        else:
            payload = request.POST

        note_id = int(payload.get("note_id"))
        question = str(payload.get("question", "")).strip()
        answer = answer_question(note_id=note_id, question=question)
        return JsonResponse(
            {"note_id": note_id, "question": question, "answer": answer},
            json_dumps_params={"ensure_ascii": False},
        )
    except (TypeError, ValueError) as exc:
        return _error_response(str(exc), status=400)
    except Exception as exc:
        return _error_response(str(exc), status=500)


def note_messages(request, note_id: int):
    if request.method != "GET":
        return _error_response("지원하지 않는 HTTP method입니다.", status=405)

    note = get_object_or_404(Note, id=note_id)
    messages = note.messages.order_by("created_at")
    return JsonResponse(
        {"note_id": note.id, "messages": [_message_to_dict(message) for message in messages]},
        json_dumps_params={"ensure_ascii": False},
    )
