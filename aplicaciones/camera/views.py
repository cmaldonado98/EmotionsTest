from django.shortcuts import render
from django.http.response import StreamingHttpResponse

# Create your views here.



def foto(request):
	return render(request, 'camera.html')
