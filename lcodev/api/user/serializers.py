from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permission_classes # decorators allows me write into the prebuilt django functions

from .models import CustomUser


class UserSerializer(serializers.HyperlinkedModelSerializer): 

    def create(self, validated_data): # creating a user
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data) # will be intaracting with the model and save it based on it # there is no password field required in the custom user model because i do not want to display the password 

        if password is not None: # if there is a password set it to password
            instance.set_password(password)
        instance.save() 
        return instance

    def update(self, instance, validated_data): # updating a user
        for attr, value in validated_data.items(): #looping trhough instance dics attr + value are the key value pairs in instance
            if attr == 'password': # if attr says you want to update your password
                instance.set_password(value) # then save it 
            else:
                setattr(instance, attr, value) 
        instance.save()
        return instance        

    class Meta:
        model = CustomUser # there is no password field required in the custom user model because i do not want to display the password 
        extra_kwargs = {'password': {'write_only': True}} # extra parameter so it will have an extra function to edit the password
        fields = (  # we are defining the fields that are already there and also adding to them 
            'name',
            'email',
            'password',
            'phone',
            'is_active',
            'is_staff',
            'is_superuser'
        )

