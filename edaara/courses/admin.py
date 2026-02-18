from django.contrib import admin
# Supprime "Resource" de la ligne d'importation
from .models import Student, Course, Path 

admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Path)
# Supprime ou commente la ligne qui enregistre Resource
# admin.site.register(Resource)