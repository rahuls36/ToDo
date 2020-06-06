from App.views import Register,Login,Logout,ToDoView
from django.urls import path

urlpatterns = [
    path('register/', Register.as_view(), name = "Register"),
    path('details/',ToDoView.as_view(), name = "Index"),
    path('login/',Login.as_view(), name = "Login"),
    path('logout/',Logout.as_view()),
    path('details/<name>/',ToDoView.as_view()),
    path('details/',ToDoView.as_view())
]