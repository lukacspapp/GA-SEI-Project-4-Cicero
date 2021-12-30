from django.db import models
from django.utils.translation import activate
from api.category.models import Category


class Product(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 300)
    price = models.CharField(max_length = 50)
    stock = models.CharField(max_length = 50)
    is_active = models.BooleanField(default = True, blank = True)
    image = models.ImageField(upload_to ='images/', blank = True, null = True) # I alredy indicated to Django that itt will be in /media and now I specified this will be coming from /media/images
    category = models.ForeignKey(Category, on_delete = models.SET_NULL, blank = True, null = True) # this field is linked to Category model
    created_at = models.DateTimeField(auto_now_add = True) # it is created that is why is True not now if it would be updated_at it would be now
    updated_at = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name