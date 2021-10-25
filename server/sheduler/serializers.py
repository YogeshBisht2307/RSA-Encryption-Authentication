from rest_framework import serializers
from sheduler.models import Task

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields= ['ipAddress', 'time', 'sucessfull', 'unsuccessfull']