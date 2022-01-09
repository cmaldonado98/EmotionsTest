"""EmotionsTest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from aplicaciones.camera import views
from aplicaciones.persona.views import crear_persona, dashboard
from aplicaciones.resultado.views import resultado

urlpatterns = [
    path("admin/", admin.site.urls),
    path("camera/", views.foto, name="foto"),
    path("", crear_persona, name="crearPersona"),
    path("resultado/<int:test_id>/", resultado, name="resultado"),
    path("dashboard/", dashboard, name="dashboard"),
]
