from rest_framework import serializers
from .models import User, UserGithub
import re
from PIL import Image

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'last_name', 'profile_image_url', 'bio', 'email', 'gender']


    def validate_name(self, name):
        if not re.match(r'^[A-Za-zÀ-ÿ\s]+$', name):
            raise serializers.ValidationError("The name must contain only letters")

        return name
    
    def validate_last_name(self, last_name):
        if last_name:
            if not re.match(r'^[A-Za-zÀ-ÿ\s]+$', last_name):
                raise serializers.ValidationError("The last name must contain only letters")

        return last_name
    
    def validate_bio(self, bio):
        if bio:
            if not re.match(r'^[A-Za-zÀ-ÿ\s]+$', bio):
                raise serializers.ValidationError("The bio must contain only letters")
        return bio
    
    def profile_image_url(self, profile_image_url):
        if profile_image_url:
            try:
                image = Image.open(profile_image_url)
                image.verify()
            except Exception:
                raise serializers.ValidationError("The profile must contain a valid picture.")
        return profile_image_url


class UserCreateFromGithubSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserGithub
        fields = ['login']


class UserGithubViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGithub
        fields = ['login', 'name','avatar_url', 'company', 'blog', 'location', 'email', 'bio', 'public_repos', 'followers', 'following']
