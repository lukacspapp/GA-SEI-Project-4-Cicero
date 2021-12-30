from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.HyperlinkedModelSerializer): # HyperLinked to be able to see items THANK YOU STACK OVERFLOW
    class Meta:
        model = Category
        fields = ('name', 'description') # these field needs to be serialized