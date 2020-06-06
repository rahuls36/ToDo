from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest, JsonResponse
from django.views import View
import json
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib.auth.models import User, AnonymousUser
from django.contrib.auth import login, authenticate
from App.models import ToDo,Tags
from django.core import serializers
import urllib.parse as parse
from collections import defaultdict
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

def check_authentication(func):
    def check_auth(*args, **kwargs):
        user = args[1].user
        return func(*args, **kwargs) if user.is_authenticated else HttpResponseForbidden()
    return check_auth

def create_url(user, view_name):
    base_url = reverse(view_name)
    query = parse.urlencode({"id": user.id})
    url = base_url[:-1] + "?" + query
    return url

def decode_data(body):
    return json.loads(body.decode()) if body else ""


class Register(View):

    def post(self, request):
        response = HttpResponse()
        try:
            user_data = json.loads(request.body.decode())
            username = user_data.get("username") or ""
            password = user_data.get("password") or ""
        except:
            response.write("Enter Valid Data")
            response.status_code = 400
            return response
        try:
            if request.user.is_autheticated:
                response.status_code = 200
                response.write("Already exists!")
        except:
            try:
                if 'user' in request.session or User.objects.get(username=username):
                    response.status_code = 409
                    response.write("Already exists")
            except:
                User.objects.create_user(username, password=password)
                response.status_code = 201
                request.session['user'] = username
                # request.session.set_expiry(20)
                response.write("Created!")
        return response

class Login(View):

    def post(self, request):
        user = request.user
        url = create_url(user, 'Index')
        if user.is_authenticated:
            return redirect(url)
        else:
            user_data = decode_data(request.body)
            if user_data and isinstance(user_data, dict):
                username = user_data.get("username","")
                password = user_data.get("password","")
                user = authenticate(request, username=username, password=password)
                if user:
                    login(request, user)
                    return redirect(url)
                return HttpResponseForbidden("Please Enter the correct credentials")
            return HttpResponseForbidden("Please Enter the correct credentials")


class Logout(View):
    @check_authentication
    def get(self, request):
        request.session.flush()
        return HttpResponse("Succefull")


class ToDoView(View):

    @check_authentication
    def get(self, request, name = None):
        data = json.loads(serializers.serialize('json', ToDo.objects.filter(name=name)) if name else
                          serializers.serialize('json', ToDo.objects.all()))
        todo_data = defaultdict(list)
        if data:
            todo_data['data'] = [item['fields'] for item in data]
            return JsonResponse(todo_data, safe=False)
        else:
            return HttpResponse("No Data Found")

    @check_authentication
    def post(self, request):
        user_data = decode_data(request.body)
        response = HttpResponse()
        if user_data and isinstance(user_data, dict):
            name = user_data.get("name") or ""
            description = user_data.get("description") or ""
            do_by = user_data.get("do_by") or ""
            tags = user_data.get("tags") or []
        else:
            return HttpResponseBadRequest("Enter the Correct Data")
        if name:
            user = request.user
            for item in ToDo.objects.filter(user__username = user.username):
                if name == item.name:
                    response.status_code = 409
                    return response
            todo = user.todo.create(name=name, description=description, do_by=do_by)
            for tag in tags:
                tag_obj = Tags.objects.filter(name = tag)[0]
                if not tag_obj:
                    tag_obj = Tags(name=tag)
                    tag_obj.save()
                todo.tags.add(tag_obj)
            todo.save()
            response.status_code = 201
            return response
        return HttpResponseBadRequest("Enter the Correct Data")

    @check_authentication
    def put(self,request):
        update_data = decode_data(request.body)
        response = HttpResponse()
        if isinstance(update_data,dict) and update_data.get("id"):
            todo = ToDo.objects.filter(id = update_data.get("id"))
            if todo:
                del(update_data["id"])
                for k,v in update_data.items():
                    if todo.__dict__.get(k):
                        if k == "tags":
                            for tags in v:
                                for tag in Tags.object.filter(name = tags):
                                    todo.__dict__[k].add(tag)
                            continue
                    todo.__dict__[k] = v
                todo.save()
                response.status = 200
                return response
            return HttpResponseBadRequest("No ToDo found for the Id")
        return HttpResponseBadRequest("Please check the Data format and provide the Id")







