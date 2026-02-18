import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-shcwezvq5&jwckxnr-0i%%cgoql_o8kwl9#v9=im#mnj1)1y@f'

# IMPORTANT : Remets DEBUG = True pour l'instant car nous sommes en développement
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Librairies tierces
    'rest_framework',      # Pour l'API JSON
    'corsheaders',         # Pour autoriser Angular
    
    # Tes applications
    'courses',
    'users',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # DOIT ÊTRE EN HAUT
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# --- CONFIGURATION CORS (Pour Angular) ---
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200", # L'adresse par défaut d'un projet Angular
]

ROOT_URLCONF = 'edaara.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')], # Chemin vers tes pages d'erreur
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'edaara',
        'USER': 'edaara_user',
        'PASSWORD': 'root',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

AUTH_USER_MODEL = 'users.User'

# --- GESTION DES FICHIERS ---
STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'resources')

# --- AUTHENTIFICATION ---
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'home'
LOGOUT_REDIRECT_URL = 'login'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True