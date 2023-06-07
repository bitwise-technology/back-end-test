from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
GENDER_CHOICES = (
    ('M', 'Masculino'),
    ('F', 'Feminino'),
    ('N', 'Não Especificado'),
)

class User(models.Model):
    username = models.CharField(max_length=30,unique=True, validators=[MinLengthValidator(5)])
    name = models.CharField(max_length=30,  validators=[MinLengthValidator(3)])
    last_name = models.CharField(max_length=30, validators=[MinLengthValidator(3)], null=True, blank=True)
    profile_image_url = models.ImageField(upload_to='profile_images', null=True, blank=True)
    bio = models.CharField(max_length=30, validators=[MinLengthValidator(3)], null=True, blank=True)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)


    class Meta:
        ordering = ('username',)
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f'{self.username}'