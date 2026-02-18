from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

# --- AJOUT DES HANDLERS D'ERREUR ---
from django.conf.urls import handler404, handler500

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', include('users.urls')),
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('courses/', include('courses.urls')),
    path('', include('courses.urls')), 
]

# Servir les fichiers media en développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# On lie les erreurs aux vues (on va les créer dans courses/views.py par exemple)
handler404 = 'courses.views.error_404'
handler500 = 'courses.views.error_500'