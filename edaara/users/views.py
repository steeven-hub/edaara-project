from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import UserRegistrationForm # Assure-toi que ton formulaire est bien importé

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user) # Connecte l'utilisateur immédiatement
            return redirect('home')
    else:
        form = UserRegistrationForm()
    return render(request, 'users/register.html', {'form': form})