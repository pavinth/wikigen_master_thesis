from django.contrib.auth.models import User
from django.db import models
from django.db.models import Q

from application.utils.mixins import DateTime


class Article(DateTime):
    article_id = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ns = models.CharField(max_length=8, null=True, blank=True)
    anon = models.CharField(max_length=64, null=True, blank=True)
    title = models.CharField(max_length=128)
    total_anchor_count = models.IntegerField(null=True)

    def __str__(self):
        return f'Article: {self.title}'

    @property
    def category_count(self):
        return self.anchor_set.filter(~Q(category__name='no_category')).values_list('category').distinct().count()

    @property
    def total_anchor_count(self):
        return self.anchor_set.count()


class ArticleMixin(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Revision(ArticleMixin, DateTime):
    revid = models.IntegerField()
    parentid = models.IntegerField()
    user = models.CharField(max_length=64)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f'{self.revid} - {self.user} at: {self.timestamp}'


class Category(DateTime):
    name = models.CharField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'Category: {self.name}'


class Anchor(ArticleMixin, DateTime):
    anchor = models.CharField(max_length=256)
    strength = models.FloatField(null=True)
    last_seen = models.DateField(null=True)
    first_seen = models.DateField(null=True)
    days_survived = models.FloatField(null=True)
    re_introductions = models.PositiveIntegerField(null=True)
    revision_survived = models.PositiveIntegerField(null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.anchor}'
