from django.urls import path,include
from sheduler.views import AddTaskView,TaskDetailView,TaksView

urlpatterns = [
    path('add-task/', AddTaskView.as_view(), name="AddTask"),
    path('tasks-view/', TaksView.as_view(), name="TaskView"),
    path('task-detail/', TaskDetailView.as_view(), name="TaskDetail"),
    
]