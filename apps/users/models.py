from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)


class UserManager(BaseUserManager):
    def _create_user(self, username, email, password, is_staff, is_superuser,
                     **extra_fields):
        email = self.normalize_email(email)
        if not email:
            raise ValueError('El email debe ser obligado')
        user = self.model(username=username, email=email, is_active=True,
                          is_staff=is_staff, is_superuser=is_superuser,
                          **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password=None, **extra_fields):
        return self._create_user(username, email, password, False, False,
                                 **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        return self._create_user(username, email, password, True, True,
                                 **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    #Datos Cuenta
    email = models.EmailField(max_length=140, unique=True)
    username = models.CharField(max_length=140, unique=True)

    first_name = models.CharField(max_length=140)
    last_name = models.CharField(max_length=140)

    #Extras
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def get_short_name(self):
        return self.first_name

    def encoded_username(self):
        import base64
        return base64.b64encode(str(self.username))

    def decode_username(self, username):
        import base64
        return base64.b64decode(username)

