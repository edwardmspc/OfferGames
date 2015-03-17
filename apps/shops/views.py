from django.shortcuts import render
from .models import Article, Genre
from django.views.generic import View


class IndexLandingView(View):
	def get(self, request,  *args, **kwargs):
		articles = Article.objects.all()
		
		genres = Genre.objects.all()

		return render(request, 'index.html')
