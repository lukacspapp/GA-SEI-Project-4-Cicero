from rest_framework import viewsets


from .serializers import CategorySerializer
from .models import Category



class CategoryViewSet(viewsets.ModelViewSet):  # What is data we are bringing from the data base? that data is gonna be converted into JSON
    queryset = Category.objects.all().order_by('name') # we re gonna order it by name 
    serializer_class = CategorySerializer 

