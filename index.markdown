---
layout: home
title: Home
nav_order: 1
---
<div class="hero">
  <p class="hero__eyebrow">New Discovery</p>
  <h1 class="hero__title">Musical Word Making</h1>
  <p class="hero__subtitle">Secret of Students Creative Talent | Practice Daily for Creative Excellence</p>
  <p class="hero__lead">Free lessons that build English word power. Read them aloud for ten minutes a day.</p>
  <p><a class="btn btn-primary fs-5" href="/posts/musical-words-full.html">Start here</a> <a class="btn fs-5" href="#lessons">See all lessons</a></p>
</div>

<h2 id="how-it-works">How it works</h2>

<p><em>When you read the word beautiful you must read all words i.e beautiful flower, beautiful queen, beautiful nature, beautiful palace, beautiful valley, beautiful sunrise, beautiful moon light, beautiful expression, beautiful feeling, beautiful scenery, beautiful poem, beautiful art, beautiful garden. It helps to remember all words easily in a musical way so one can recall immediately.</em></p>

<p>This site is dedicated to all the school children across the globe, who face difficulties in speaking and writing in English and other mother-tongue. <a href="/about/">More about Vedic English</a></p>

<h2 id="lessons">Must Read and Remember (Students' Paradise of Words)</h2>

{% assign levels = "1|Start here,2|Next steps,3|For writers and speakers" | split: "," %}
{% for level in levels %}
{% assign part = level | split: "|" %}
{% assign level_number = part[0] | plus: 0 %}
<h3 class="level-heading">{{ part[1] }}</h3>
<div class="series-grid">
{% for entry in site.data.series %}{% if entry.section == "english" and entry.level == level_number %}{% include series-card.html series=entry %}{% endif %}{% endfor %}
</div>
{% endfor %}

{% include series-lessons.html key="" %}
{% if lessons.size > 0 %}
<h3 class="level-heading">More lessons</h3>
<ul>
{% for row in lessons %}{% assign cell = row | split: "|" %}<li><a href="{{ cell[1] }}">{{ cell[2] }}</a></li>
{% endfor %}
</ul>
{% endif %}

{% if site.data.videos %}
<h2 id="videos">Listen and sing</h2>
<div class="video-grid">
{% for video in site.data.videos %}{% include video.html video=video %}{% endfor %}
</div>
{% endif %}

<h2 id="odia">Odia</h2>

<div class="series-grid">
{% for entry in site.data.series %}{% if entry.section == "odia" %}{% include series-card.html series=entry %}{% endif %}{% endfor %}
</div>

<h2 id="books">Books by the author</h2>

<div class="book-grid">
{% for book in site.data.books %}
<figure class="book">
  <img src="/assets/images/books/{{ book.cover }}" alt="Cover of {{ book.title | escape }}" loading="lazy">
  <figcaption>
    <strong>{{ book.title }}</strong>
    {% for link in book.links %}<br><a href="{{ link.url }}">{{ link.label }}</a>{% endfor %}
  </figcaption>
</figure>
{% endfor %}
</div>

<h2 id="dedication">Dedication</h2>

{% include dedication.html %}
