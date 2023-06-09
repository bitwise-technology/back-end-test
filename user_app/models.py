from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Not Specified', 'Not Specified'),
)


class User(models.Model):
    username = models.CharField(max_length=30,unique=True, validators=[MinLengthValidator(5)])
    name = models.CharField(max_length=30,  validators=[MinLengthValidator(3)])
    last_name = models.CharField(max_length=30, validators=[MinLengthValidator(3)], null=True, blank=True)
    profile_image_url = models.CharField(max_length=255, null=True, blank=True)
    bio = models.CharField(max_length=30, validators=[MinLengthValidator(3)], null=True, blank=True)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=13, choices=GENDER_CHOICES, blank=True, null=True, default='Not Specified')

    class Meta:
        ordering = ('username',)
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f'{self.username}'
    

class UserGithub(models.Model):
    login = models.CharField(max_length=30,unique=True, validators=[MinLengthValidator(5)])
    name = models.CharField(max_length=40, null=True, blank=True)
    avatar_url = models.CharField(max_length=255, null=True, blank=True)
    company = models.CharField(max_length=255, null=True, blank=True)
    blog = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    email =  models.EmailField(null=True, blank=True)
    bio = models.CharField(max_length=200, null=True, blank=True)
    public_repos = models.IntegerField(null=True, blank=True)
    followers = models.IntegerField(null=True, blank=True)
    following = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ('login',)
        verbose_name = 'User Github'
        verbose_name_plural = 'Users Github'

    def __str__(self):
        return f'{self.login}'
    