from django.shortcuts import render
from django.http.response import StreamingHttpResponse

# Create your views here.



def foto(request):	
	id = request.session['valor']
	return render(request, 'camera.html',{'valor':id})
