from django.shortcuts import render
from aplicaciones.persona.forms import PersonaForm
from aplicaciones.persona.models import Persona
from django.core.exceptions import PermissionDenied

def resultado(request, testId):
	if request.session['resultado'] is 'login':
		persona = Persona.objects.get(id = testId)
		if request.method == 'GET':
			form = PersonaForm(instance=persona)
			contexto = {
				'persona':persona,			
			}	
		return render(request, 'resultado.html', contexto)
	else:
		raise PermissionDenied


