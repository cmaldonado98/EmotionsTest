from django.shortcuts import redirect, render, redirect

from aplicaciones.persona.models import Persona
from .forms import PersonaForm


def crearPersona(request):
    if request.method == "GET":
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
            request.session['valor'] = id            
            return redirect('foto')
    return render(request, 'personaForm.html', contexto)
