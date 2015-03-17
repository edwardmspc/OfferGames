# -*- coding: utf-8 -*-
import urllib,urllib2
import re
from bs4 import BeautifulSoup
# or if you're using BeautifulSoup4:
# from bs4 import BeautifulSoup
# 
# 
# 
keyword = "Dragon Ball: Xenoverse"

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
item_data['galery'] = [a["href"] for a in item_page.select('span[itemtype^=http://schema.org/ImageObject] a')]
item_data['description'] = item_page.select('p[itemprop^=description]')[0].text
item_data['cover'] = cover_image


for a in item_page.select('dl'):
	x = [b.text for b in a.select('dt')]
	y = [c.text for c in a.select('dd')]

	for q in range(len(x)):
		item_data[x[q]] = y[q]


print item_data['galery']

