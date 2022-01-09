from django.shortcuts import redirect, render, redirect

from aplicaciones.persona.models import Persona
from .forms import PersonaForm
from django.core.exceptions import PermissionDenied
from django.contrib.auth import authenticate, login
from aplicaciones.persona.models import Persona


def crear_persona(request):
    if request.method == "GET":
        try:
            del request.session['resultado']
            del request.session['camera']
        except Exception:
            print()
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
            test_id = form.instance.pk 
            producto = form.instance.producto           
            request.session['valor'] = test_id
            request.session['producto'] = producto
            request.session['camera'] = 'login'                
            return redirect('foto')
    return render(request, 'personaForm.html', contexto)

def dashboard(request):
    try:
        del request.session['camera']
    except Exception:
        print()	
    return render(request, 'dashboard.html')
