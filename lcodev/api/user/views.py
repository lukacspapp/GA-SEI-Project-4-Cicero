from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt # django by default gives a protection from cross site request forgery CSRF 
from django.contrib.auth import login, logout
import random
import re

# I need to generate a session token it django doesn;t generate one 
# as long as that token is active the user is logged in 
# once the user hit log out we are gonna delete that token from the db so nothing will be saved on the user after that
# CHAR(97) ---> 'a' 
# random.SystemRandom().choice(['a','b','c']) list goes here and this method generate a random item from that list every time 



def generate_session_token(length=10): # generate a random character + generate a random string which is from a-z or 0-9 which is 9 character long + 10 characters long only  and join then together
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))


@csrf_exempt # this makes the sign in expemt from csrf
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid paramenter only'})

    # print(request.POST.get('email', None))  - if you will not get email, None will be printed # extracting the email and password from the post method
    username = request.POST['email']
    password = request.POST['password']

    print(username)
    print(password)

# --------------- validation ------------------ regexr.com
    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({'error': 'Enter a valid email'})

    if len(password) < 5:
        return JsonResponse({'error': 'Password needs to be at least of 5 characters'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username) # grabbing the email from user and assign it to user var

        if user.check_password(password): # i just want to filter the dict and look for the value from the email key
            usr_dict = UserModel.objects.filter(email=username).values().first()
            usr_dict.pop('password') # get rid of the password as we do not want it to travel on the front end 

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error': "Previous session exists!"})

            token = generate_session_token() # generating a session token and giving to the front end
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'Invalid password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid Email'})


def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid user ID'})

    return JsonResponse({'success': 'Logout success'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]
