from django.shortcuts import redirect, render
from django.http.response import StreamingHttpResponse
from django.core.exceptions import PermissionDenied
from django.contrib.auth import authenticate, login
from aplicaciones.persona.models import Persona
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def foto(request):	
	if request.session.get('camera', 'logout') == 'login':
		test_id = request.session['valor']
		producto = request.session['producto']
		request.session['resultado'] = 'login'
		return render(request, 'camera.html',{'valor':test_id, 'producto' : producto})
	else:
		return redirect('crearPersona')
