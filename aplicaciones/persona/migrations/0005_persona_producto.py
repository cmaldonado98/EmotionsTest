# Generated by Django 3.2.8 on 2022-01-04 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('persona', '0004_remove_persona_producto'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='producto',
            field=models.CharField(choices=[('Hamburguesa', 'Hamburguesa'), ('Producto2', 'Producto2')], default='Hamburguesa', max_length=30),
        ),
    ]
