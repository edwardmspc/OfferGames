# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0002_article_media'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='galery',
            name='article',
        ),
        migrations.DeleteModel(
            name='Galery',
        ),
    ]
