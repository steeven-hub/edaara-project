from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Définition des rôles pour E-Daara
    ROLE_CHOICES = (
        ('apprenant', 'Apprenant'),
        ('enseignant', 'Enseignant'),
        ('admin', 'Administrateur'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='apprenant')
    telephone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"