from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    file = models.FileField(upload_to="notes/", blank=True, null=True)
    file_name = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title


class ChatMessage(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="messages")
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self) -> str:
        return f"{self.note_id}: {self.question[:40]}"
