# Generated by Django 2.0 on 2019-11-02 08:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0004_auto_20191027_1626'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='anchor',
            name='revision_end_date',
        ),
        migrations.RemoveField(
            model_name='anchor',
            name='revision_start_date',
        ),
    ]
