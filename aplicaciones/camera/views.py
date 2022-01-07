from django.shortcuts import render
from django.http.response import StreamingHttpResponse
from django.core.exceptions import PermissionDenied
from django.contrib.auth import authenticate, login
from aplicaciones.persona.models import Persona

# Create your views here.



def foto(request):	
	if request.session['camera'] is 'login':
		id = request.session['valor']
		producto = request.session['producto']
		request.session['resultado'] = 'login'
		return render(request, 'camera.html',{'valor':id, 'producto' : producto})
	else:
		raise PermissionDenied
