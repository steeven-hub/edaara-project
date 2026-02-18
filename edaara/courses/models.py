from django.db import models
from django.conf import settings

class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    # Modifié en CharField pour accepter "2h"
    duration = models.CharField(max_length=50, help_text="Ex: 2h, 45min")
    prerequisites = models.TextField(blank=True, null=True)
    students = models.ManyToManyField(Student, blank=True)
    # Ajout du champ PDF directement ici pour simplifier
    pdf_resource = models.FileField(upload_to='resources/', null=True, blank=True)

    def __str__(self):
        return self.title

class Path(models.Model):
    title = models.CharField(max_length=200)
    courses = models.ManyToManyField(Course)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title