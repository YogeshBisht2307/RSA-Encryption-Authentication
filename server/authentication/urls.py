from django.urls import path,include
from authentication.views import RegisterView, LoginView, UserView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="Register"),
    path('login/', LoginView.as_view(), name="Login"),
    path('user/', UserView.as_view(), name="User"),
    path('logout/', LogoutView.as_view(), name="Logout"),
]