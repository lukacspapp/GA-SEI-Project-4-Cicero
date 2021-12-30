from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    name = models.CharField(max_length = 50, default = 'Customer') 
    email = models.EmailField(max_length = 200, unique = True)
    
    username = None # because I do not want to sign in the user with username but with EMAIL

    USERNAME_FIELD = 'email' # so the username field will be governed by the email
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length = 50, blank = True, null = True)
    
    session_token = models.CharField(max_length = 10, default = 0) 

    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)


