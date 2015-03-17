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
                ('content', models.TextField(blank=True)),
                ('imagen', models.ImageField(upload_to=b'shop', blank=True)),
                ('trailer', models.CharField(max_length=140, blank=True)),
                ('amount', models.DecimalField(default=0.0, max_digits=9, decimal_places=2)),
                ('views', models.PositiveIntegerField(default=0, editable=False)),
                ('solds', models.PositiveIntegerField(default=0, editable=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
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
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=140)),
                ('slug', models.SlugField(editable=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Platform',
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
            name='genre',
            field=models.ManyToManyField(to='shops.Genre', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='article',
            name='platform',
            field=models.ManyToManyField(to='shops.Platform'),
            preserve_default=True,
        ),
    ]
