# Generated by Django 4.2.2 on 2023-06-07 11:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        max_length=30,
                        unique=True,
                        validators=[django.core.validators.MinLengthValidator(5)],
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=30,
                        validators=[django.core.validators.MinLengthValidator(3)],
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True,
                        max_length=30,
                        null=True,
                        validators=[django.core.validators.MinLengthValidator(3)],
                    ),
                ),
                (
                    "profile_image_url",
                    models.ImageField(
                        blank=True, null=True, upload_to="profile_images"
                    ),
                ),
                (
                    "bio",
                    models.CharField(
                        blank=True,
                        max_length=30,
                        null=True,
                        validators=[django.core.validators.MinLengthValidator(3)],
                    ),
                ),
                ("email", models.EmailField(max_length=254, unique=True)),
                (
                    "gender",
                    models.CharField(
                        choices=[
                            ("M", "Masculino"),
                            ("F", "Feminino"),
                            ("N", "Não Especificado"),
                        ],
                        max_length=1,
                    ),
                ),
            ],
            options={
                "verbose_name": "User",
                "verbose_name_plural": "Users",
                "ordering": ("username",),
            },
        ),
    ]