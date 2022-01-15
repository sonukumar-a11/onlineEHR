import imp
from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    speciality = models.CharField(max_length=50)
    gender = models.CharField(max_length = 50)


    def __str__(self):
        return self.user.username