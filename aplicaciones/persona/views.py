from django.shortcuts import redirect, render, redirect

from aplicaciones.persona.models import Persona
from .forms import PersonaForm
from django.core.exceptions import PermissionDenied
from django.contrib.auth import authenticate, login
from aplicaciones.persona.models import Persona


def crearPersona(request):
    if request.method == "GET":
        del request.session['resultado']
        form = PersonaForm()
        contexto = {
            'form':form
        }
    else:
        form = PersonaForm(request.POST)
        contexto = {
            'form':form
        }
        if form.is_valid():
            
            form.save()
            id = form.instance.pk 
            producto = form.instance.producto           
            request.session['valor'] = id
            request.session['producto'] = producto

            request.session['camera'] = 'login'
            # username = form.instance.nombre
            # password = str(form.instance.id)
            # # user = authenticate(request, username=username, password=password)
            # login(request, user)                
            return redirect('foto')
    return render(request, 'personaForm.html', contexto)

def dashboard(request):	
	return render(request, 'dashboard.html')
