from django.shortcuts import redirect, render
from aplicaciones.persona.forms import PersonaForm
from aplicaciones.persona.models import Persona
from django.core.exceptions import PermissionDenied

def resultado(request, testId):
	try:
		del request.session['camera']
	except:
		print()
	if request.session.get('resultado','logout') == 'login':		
		persona = Persona.objects.get(id = testId)
		if request.method == 'GET':
			form = PersonaForm(instance=persona)
			contexto = {
				'persona':persona,			
			}	
		return render(request, 'resultado.html', contexto)
	else:
		return redirect('crearPersona')


