# Generated by Django 2.0 on 2019-06-12 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0002_anchor'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='anon',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]
