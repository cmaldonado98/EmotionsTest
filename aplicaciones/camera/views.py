from django.shortcuts import render
from django.http.response import StreamingHttpResponse

# Create your views here.



def foto(request):	
	id = request.session['valor']
	producto = request.session['producto']
	return render(request, 'camera.html',{'valor':id, 'producto' : producto})
