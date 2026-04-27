from django.urls import path

from app import views


urlpatterns = [
    path("notes/", views.notes, name="notes"),
    path("chat/", views.chat, name="chat"),
    path("notes/<int:note_id>/messages/", views.note_messages, name="note-messages"),
]
