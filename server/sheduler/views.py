
from django.shortcuts import render
from sheduler.serializers import TasksSerializer
from rest_framework.views import APIView
from sheduler.models import Task
from rest_framework.response import Response
import os
import schedule
import time
# Create your views here.

def pingingIP(self, task, ipAddress):
    response = os.popen(f"ping {ipAddress}").read()
    if "Received = 4" in response:
        print(f"UP {ipAddress} Ping Successful")
        task.successfull = task.successfull + 1;
        task.save()
    else:
        print(f"DOWN {ipAddress} Ping Unsuccessful")
        task.unsuccessfull = task.unsuccessfull + 1;
        task.save()


def sheduling():
    tasks = Task.objects.all()
    for task in tasks:
        if task.time == 'minute':
            schedule.every(1).minutes.do(pingingIP(task, task.ipAddress))
        elif task.time == 'hour':
            schedule.every(1).hour.do(pingingIP(task, task.ipAddress))
        elif task.time == 'day':
            schedule.every(1).day.do(pingingIP(task, task.ipAddress))

sheduling()

class AddTaskView(APIView):
    def post(self, request, format = None):
        ipAddress = request.data['ipAddress']
        time = request.data['time']

        task = Task()
        task.ipAddress = ipAddress
        task.time = time
        task.save();

        return Response({'message', 'Task Sheduled Successfully'}, status = 200)


class TaksView(APIView):
    def get(self, request, format = None):
        try:
            tasks = Task.objects.all()
        except ValueError:
            return Response({"message": "No task are sheduled"}, status = 400)
        serialize = TasksSerializer(tasks)

        return Response(serialize.data, status= 200)

class TaskDetailView(APIView):
    def get(self, request, format = None):
        try:
            task = Task.object.filter(id = request.data['id'])
        except ValueError:
            return Response({'message': 'No task avialble with given data'}, status = 400)
        

