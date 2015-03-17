# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0004_galery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='platform',
            field=models.ManyToManyField(to='shops.Platform', blank=True),
            preserve_default=True,
        ),
    ]
