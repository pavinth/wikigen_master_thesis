# Generated by Django 2.0 on 2019-09-16 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='total_anchor_count',
        ),
    ]
