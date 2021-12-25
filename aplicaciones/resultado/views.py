from django.shortcuts import render
from aplicaciones.persona.forms import PersonaForm
from aplicaciones.persona.models import Persona

def resultado(request, testId):
	persona = Persona.objects.get(id = testId)
	if request.method == 'GET':
		form = PersonaForm(instance=persona)
		contexto = {
			'persona':persona,			
		}	
	return render(request, 'resultado.html', contexto)


