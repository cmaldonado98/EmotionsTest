from django.shortcuts import render
from .models import Persona
from django.http import HttpResponse
from django.shortcuts import render
from .models import *
from django.core.mail import EmailMessage
from django.views.decorators import gzip
from django.http import StreamingHttpResponse
import cv2
import threading
import boto3
import time
import asyncio
# Create your views here.


#AWS REKOGNITION
async def detect_faces(photo):

    client=boto3.client('rekognition')
    
    response = client.detect_faces(
        Image={
            'Bytes': photo
        }, 
        Attributes=[
            'ALL'
        ]    
    )
    print(response)
    #await asyncio.sleep(2)
    return response

@gzip.gzip_page
def inicio(request):
    try:
        cam = VideoCamera()
        return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:
        pass
    return render(request, 'index.html')

#to capture video class
class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()
        

    def __del__(self):
        self.video.release()

    def get_frame(self):
        image = self.frame
        _, jpeg = cv2.imencode('.jpg', image)        
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()

def gen(camera):
    while True:
        frame = camera.get_frame()
        #time.sleep(2)
        #asyncio.create_subprocess_exec(detect_faces(frame))
        #asyncio.run(detect_faces(frame))        
        #response = detect_faces(frame)
        
        k = cv2.waitKey(1)

        if k%256 == 27:
            # ESC pressed
            print("Escape hit, closing...")
            
        elif k%256 == 32:
            # SPACE pressed
            
            
            for faceDetail in response['FaceDetails']:
                print('Emotions: \t Confidence\n')
                for emotion in faceDetail['Emotions']:
                    print(str(emotion['Type']) + '\t\t' + str(emotion['Confidence']))
                    print('\n')
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        yield (detect_faces(frame))