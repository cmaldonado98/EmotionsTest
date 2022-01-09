from django.shortcuts import redirect, render
from aplicaciones.persona.forms import PersonaForm
from aplicaciones.persona.models import Persona
from django.core.exceptions import PermissionDenied

def resultado(request, test_id):
	try:
		del request.session['camera']
	except Exception:
		print()
	if request.session.get('resultado','logout') == 'login':		
		persona = Persona.objects.get(id = test_id)
		if request.method == 'GET':
			contexto = {
				'persona':persona,			
			}	
		return render(request, 'resultado.html', contexto)
	else:
		return redirect('crearPersona')


