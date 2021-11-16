from django.shortcuts import redirect, render, redirect
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
            return redirect('foto')
    return render(request, 'personaForm.html',contexto)
