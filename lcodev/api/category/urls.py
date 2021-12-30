from rest_framework import routers
from django.urls import path, include

from . import views

router = routers.DefaultRouter()
router.register(r'', views.CategoryViewSet) # I already defined it so I won't need to do it again

urlpatterns = [
    path('', include(router.urls)) 
]
