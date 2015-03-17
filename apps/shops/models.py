from django.db import models
from django.template.defaultfilters import slugify
# -*- coding: utf-8 -*-
import urllib,urllib2
import re
from bs4 import BeautifulSoup

from django.core.files.base import ContentFile
from PIL import Image
from StringIO import StringIO
from django.db.models.signals import post_save


class Genre(models.Model):
    name = models.CharField(max_length=140)
    slug = models.SlugField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Genre, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=140)
    slug = models.SlugField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Platform, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.name        

class Article(models.Model):
    name = models.CharField(max_length=140)
    slug = models.SlugField(editable=False)
    genre = models.ManyToManyField(Genre, blank=True)
    platform = models.ManyToManyField(Platform, blank=True)
    content = models.TextField(blank=True)
    imagen = models.ImageField(upload_to='shop', blank=True)
    trailer = models.CharField(max_length=140, blank=True)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    views = models.PositiveIntegerField(default=0, editable=False)
    solds = models.PositiveIntegerField(default=0, editable=False)
    media = models.TextField(blank=True, editable=False)


    def download_image(self, url):
        input_file = StringIO(urllib2.urlopen(url).read())
        output_file = StringIO()
        img = Image.open(input_file)
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(output_file, "JPEG")
        self.imagen.save(self.name+".jpg", ContentFile(output_file.getvalue()), save=False)


    def save(self, *args, **kwargs):
        if not self.id:
            keyword = self.name

            query_args = { 'q':keyword, 'zona':'resultados-busqueda' }
            encoded_args = urllib.urlencode(query_args)
            url_search = 'http://www.3djuegos.com/?' + encoded_args
            search = BeautifulSoup(urllib2.urlopen(url_search).read())

            links = [a.attrs.get('href') for a in search.select('table.mar_b14 div.mar_b4 a')]
            plataforma = [a.text for a in search.select('table.mar_b14 div.s12 span.plats')]

            for i in range(len(links)):
                if plataforma[i] == "PS3":
                    url_item = "http://www.3djuegos.com%s" % links[i]
                    break

            item_page = BeautifulSoup(urllib2.urlopen(url_item).read())
            cover_link = item_page.select('div[id^=caratula]')[0].a["href"]
            cover_page = BeautifulSoup(urllib2.urlopen(cover_link).read())
            cover_image = cover_page.select('div[class^=mar_10]')[0].img["src"]

            item_data = {}
            item_data['description'] = item_page.select('p[itemprop^=description]')[0].text
            item_data['cover'] = cover_image
            item_data['galery'] = [a["href"] for a in item_page.select('span[itemtype^=http://schema.org/ImageObject] a')]


            for a in item_page.select('dl'):
                x = [b.text for b in a.select('dt')]
                y = [c.text for c in a.select('dd')]

                for q in range(len(x)):
                    item_data[x[q]] = y[q]

            self.content = item_data['description']
            self.download_image(item_data['cover'])
            self.media = item_data['galery']

            self.slug = slugify(self.name)
        super(Article, self).save(*args, **kwargs)


    def __unicode__(self):
        return self.name

class Galery(models.Model):
    imagen = models.ImageField(upload_to='galery', blank=True)
    url = models.CharField(max_length=200, editable=False)
    article = models.ForeignKey(Article)
    
    def download_image(self, url):
        input_file = StringIO(urllib2.urlopen(url).read())
        output_file = StringIO()
        img = Image.open(input_file)
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(output_file, "JPEG")
        self.imagen.save(self.url+".jpg", ContentFile(output_file.getvalue()), save=False)

    def save(self, *args, **kwargs):
        self.download_image(self.url)
        super(Galery, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.article.name


def update(sender,**kwargs):
    try:
        varff = kwargs.get('instance')
        for x in varff.media:
            print "Descargando %s" %(x)
            q = Galery(url=x, article=varff)
            q.save()
    except:
        print "Error"

post_save.connect(update, sender=Article)
