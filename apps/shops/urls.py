from django.conf.urls import patterns, include, url
from .views import IndexLandingView


urlpatterns = patterns('',
	url(r'^$', IndexLandingView.as_view(), name='index_landing'),
)
