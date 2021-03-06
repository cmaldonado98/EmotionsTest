# Generated by Django 3.2.8 on 2022-01-02 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('persona', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='edad',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='persona',
            name='sexo',
            field=models.CharField(choices=[('Masculino', 'Masculino'), ('Femenino', 'Femenino')], default='Masculino', max_length=20),
        ),
        migrations.AlterField(
            model_name='persona',
            name='correo',
            field=models.EmailField(max_length=100),
        ),
    ]
