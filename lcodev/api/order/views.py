from django.shortcuts import render
import json
from django.contrib.auth.models import User
from django.contrib.auth.signals import user_logged_in
from django.db.models.fields.related import ForeignKey
from rest_framework import viewsets
from django.http import JsonResponse, request
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt


def validate_user_session(id, token): # whenever requesting this url the user is bringing id and token
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk = id) # user is bringing the id 
        if user.session_token == token: # if the user has a token it will be assigned as a parameter
            return True
        return False    
    except UserModel.DoesNotExist:
        return False


# When user hit a certian route it needs to execute a method which is responsible to collecting data and pushing that into admin

@csrf_exempt
def add(reuquest, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({ 'error': 'Please Login', 'code': '401'})

    if reuquest.method == 'POST': 
        user_id = id
        transaction_id = reuquest.POST['transaction_id']
        amount = reuquest.POST['amount']
        products = reuquest.POST['products']

        total = len(products.split(',')[:-1])

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk = user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        order = Order(user = user, product_names = products, total_products = total, transaction_id = transaction_id, total_amount = amount)
        order.save()
        return JsonResponse({'success': True, 'error': False, 'message': 'Order is placed successfully'})


class OrderViewSet(viewsets.ModelViewSet):  
    queryset = Order.objects.all().order_by('id')  
    serializer_class = OrderSerializer        