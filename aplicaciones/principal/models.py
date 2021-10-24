from django.db import models

# Create your models here.

class Persona(models.Model):
    idPersona = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=120)
    correo = models.EmailField(max_length=200)
