from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Tags(models.Model):

    name = models.CharField(max_length= 120)
    def __str__(self):
        return self.name

class ToDo(models.Model):

    name = models.CharField(max_length= 120,null= False)
    description = models.CharField(max_length= 1024)
    created_at = models.DateTimeField(auto_now_add= True)
    tags = models.ManyToManyField(Tags)
    user = models.ForeignKey(User,on_delete= models.CASCADE, related_name= "todo")
    do_by = models.DateField()

    def __str__(self):
        return self.name


