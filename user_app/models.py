from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)


class User(models.Model):
    username = models.CharField(max_length=30,unique=True, validators=[MinLengthValidator(5)])
    name = models.CharField(max_length=30,  validators=[MinLengthValidator(3)])
    last_name = models.CharField(max_length=30, validators=[MinLengthValidator(3)], null=True, blank=True)
    profile_image_url = models.CharField(max_length=255, null=True, blank=True)
    bio = models.CharField(max_length=30, validators=[MinLengthValidator(3)], null=True, blank=True)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=13, choices=GENDER_CHOICES, blank=True, null=True)

    class Meta:
        ordering = ('username',)
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f'{self.username}'
    
    def save(self,*args, **kwargs):
        if self.gender is None:
            self.gender = "Not Specified"
        super().save(*args, **kwargs)