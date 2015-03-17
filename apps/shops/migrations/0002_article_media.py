# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='media',
            field=models.TextField(editable=False, blank=True),
            preserve_default=True,
        ),
    ]
