from django.shortcuts import render
from rest_framework import viewsets

from .serializers import ProductSerializer
from .models import Product
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id') # I am doing an extra filteration and rendering them by id 
    serializer_class = ProductSerializer
