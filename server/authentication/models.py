import string
import secrets
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager


# function for gettting a unique id
def get_unique_id():
    res = ''.join(secrets.choice(string.ascii_uppercase + string.digits)
                                                  for i in range(6))
    return str(res)

# usermanager for managing the functionality of overrided user model
class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def create_user(self, email, password,first_name=None, last_name=None, age=0, unique_id = get_unique_id(), image=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not unique_id:
            raise ValueError("Users must have an unique id ")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name = last_name,
            age= age,
            unique_id = unique_id,
            image = image
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password, first_name=None, unique_id = get_unique_id()):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            unique_id = unique_id,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password,first_name=None, unique_id = get_unique_id()):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            unique_id = unique_id,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email address',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(
        verbose_name = "First Name",
        max_length = 100, 
        null=True, 
        blank = True, 
        unique=False
        )
    last_name = models.CharField(
        verbose_name = "Last Name",
        max_length = 100, 
        null=True, 
        blank = True, 
        unique=False)
    unique_id = models.CharField(
        verbose_name = 'Unique ID',
        max_length=6, 
        unique = True, 
        null=False, 
        blank=False
        )
    age = models.IntegerField(default = 0, null=True, blank = True, unique=False)
    
    image = models.ImageField(upload_to = "upload/users/")

    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser

    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.
    
    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.first_name + self.last_name

    def get_short_name(self):
        # The user is identified by their email address
        return self.first_name

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin
