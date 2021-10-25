from django.db import models

# Create your models here.
class Task(models.Model):
    ipAddress = models.CharField(max_length = 20, null=False)
    time = models.DateTimeField()
    successfull = models.IntegerField(default=0)
    unsuccessfull = models.IntegerField(default=0)

    def __str__(self):
        return self.ipAddress
