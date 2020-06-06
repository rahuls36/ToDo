from App.views import Register,Login,Logout,ToDoView
from django.urls import path

urlpatterns = [
    path('register/', Register.as_view(), name = "Register"),
    path('login/',Login.as_view(), name = "Login"),
    path('logout/',Logout.as_view()),
    path('details/<int:todo_id>/',ToDoView.as_view(), name = "ToDo"),
    path('details/',ToDoView.as_view(), name = "ToDo"),
    path('details/delete/<int:todo_id>/',ToDoView.as_view(),name = "ToDo")
]