# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=140)),
                ('slug', models.SlugField(editable=False)),
                ('content', models.TextField()),
                ('imagen', models.ImageField(upload_to=b'shops')),
                ('trailer', models.CharField(max_length=140)),
                ('amount', models.DecimalField(default=0.0, max_digits=9, decimal_places=2)),
                ('views', models.PositiveIntegerField(default=0)),
                ('solds', models.PositiveIntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=140)),
                ('slug', models.SlugField(editable=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ManyToManyField(to='shops.Category'),
            preserve_default=True,
        ),
    ]
