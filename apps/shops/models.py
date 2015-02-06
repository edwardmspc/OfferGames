from django.db import models
from django.template.defaultfilters import slugify



class Category(models.Model):
    name = models.CharField(max_length=140)
    slug = models.SlugField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)


class Article(models.Model):
    name = models.CharField(max_length=140)
    slug = models.SlugField(editable=False)
    category = models.ManyToManyField(Category)
    content = models.TextField()
    imagen = models.ImageField(upload_to='shops')
    trailer = models.CharField(max_length=140)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    views = models.PositiveIntegerField(default=0)
    solds = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)
        super(Article, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.name
