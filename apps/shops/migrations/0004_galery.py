# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0003_auto_20150317_0025'),
    ]

    operations = [
        migrations.CreateModel(
            name='Galery',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('imagen', models.ImageField(upload_to=b'galery', blank=True)),
                ('url', models.CharField(max_length=200, editable=False)),
                ('article', models.ForeignKey(to='shops.Article')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
