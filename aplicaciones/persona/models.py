from django.db import models
from django.utils.translation import deactivate

class Persona(models.Model):
    id = models.AutoField(primary_key= True)
    nombre = models.CharField(max_length= 100)
    apellido = models.CharField(max_length= 100)    
    correo = models.EmailField(max_length= 100)
    genero = (('Masculino',"Masculino"),('Femenino',"Femenino"))
    sexo = models.CharField(max_length= 20, choices= genero, default="Masculino")
    edad = models.PositiveSmallIntegerField(default=1)
    
