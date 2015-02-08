from django.shortcuts import render
from .models import Article, Category
from django.views.generic import View


class IndexLandingView(View):
	def get(self, request,  *args, **kwargs):
		articles = Article.objects.all()
		
		categorys = Category.objects.all()

		return render(request, 'shops/index.html')
