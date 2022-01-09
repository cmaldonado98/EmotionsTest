from django.shortcuts import redirect, render
from django.http.response import StreamingHttpResponse
from django.core.exceptions import PermissionDenied
from django.contrib.auth import authenticate, login
from aplicaciones.persona.models import Persona


def foto(request):	
	if request.session.get('camera', 'logout') == 'login':
		testId = request.session['valor']
		producto = request.session['producto']
		request.session['resultado'] = 'login'
		return render(request, 'camera.html',{'valor':testId, 'producto' : producto})
	else:
		return redirect('crearPersona')
