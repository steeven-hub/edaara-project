from django.urls import path
from . import views

urlpatterns = [
    # Page d'accueil du projet E-Daara
    path('', views.home, name='home'),

    # Nouveau : Dashboard spécifique pour l'apprenant (Ressources PDF)
    path('dashboard/', views.dashboard_apprenant, name='dashboard_apprenant'),

    # Gestion des cours
    path('courses/', views.course_list, name='course_list'),
    path('courses/add/', views.course_add, name='course_add'),
    path('courses/enroll/<int:course_id>/', views.enroll_course, name='enroll_course'),

    # Gestion des parcours (Paths)
    path('paths/', views.path_list, name='path_list'),
    path('paths/add/', views.path_add, name='path_add'),
]