from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import Course, Path, Student

# --- SÉCURITÉ : Vérification du rôle ---
def est_enseignant(user):
    return user.is_authenticated and user.role == 'enseignant'

def est_apprenant(user):
    return user.is_authenticated and user.role == 'apprenant'

# --- PAGES D'ACCUEIL & LISTES ---

@login_required
def home(request):
    courses = Course.objects.all()
    paths = Path.objects.all()
    # On passe les rôles au template pour masquer/afficher les boutons
    return render(request, 'courses/home.html', {
        'courses': courses, 
        'paths': paths,
        'is_enseignant': request.user.role == 'enseignant',
        'is_apprenant': request.user.role == 'apprenant'  # <--- Ajouté ici
    })

def course_list(request):
    courses = Course.objects.all()
    return render(request, 'courses/course_list.html', {'courses': courses})

def path_list(request):
    paths = Path.objects.all()
    return render(request, 'courses/path_list.html', {'paths': paths})

# --- GESTION DES COURS (RÉSERVÉ AUX ENSEIGNANTS) ---

@user_passes_test(est_enseignant)
def course_add(request):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST.get('description', '')
        duration = request.POST['duration']
        # On récupère le fichier dans request.FILES
        pdf = request.FILES.get('pdf_file')

        Course.objects.create(
            title=title,
            description=description,
            duration=duration,
            pdf_resource=pdf  # Django s'occupe de le copier dans /resources/
        )
        return redirect('home')
        
    return render(request, 'courses/course_add.html')

@user_passes_test(est_enseignant)
def path_add(request):
    courses = Course.objects.all()
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST.get('description', '')
        selected_courses = request.POST.getlist('courses')
        path = Path.objects.create(title=title, description=description)
        path.courses.set(selected_courses)
        return redirect('path_list')
    return render(request, 'courses/path_add.html', {'courses': courses})

# --- ACTIONS ÉTUDIANT (RÉSERVÉ AUX APPRENANTS) ---

@login_required
@user_passes_test(est_apprenant)
def enroll_course(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    student, created = Student.objects.get_or_create(user=request.user)
    course.students.add(student)
    return render(request, 'courses/enroll_success.html', {'course': course})
@login_required
@user_passes_test(est_apprenant)
def dashboard_apprenant(request):
    # On récupère l'objet Student lié à l'utilisateur connecté
    student = get_object_or_404(Student, user=request.user)
    
    # On récupère tous les cours de cet étudiant
    mes_cours = student.courses.all() 
    
    return render(request, 'courses/dashboard.html', {
        'courses': mes_cours
    })
from django.shortcuts import render # Assure-toi que cet import est bien en haut du fichier

# ... tes autres vues (course_add, etc.) ...

def error_404(request, exception):
    return render(request, 'errors/404.html', status=404)

def error_500(request):
    return render(request, 'errors/500.html', status=500)