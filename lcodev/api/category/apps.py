from django.apps import AppConfig

from api import category


class CategoryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.category'
