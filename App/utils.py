from django.http import HttpResponseForbidden
import json
from django.shortcuts import reverse
import urllib.parse as parse

def check_authentication(func):
    def check_auth(*args, **kwargs):
        user = args[1].user
        print(user)
        return func(*args, **kwargs) if user.is_authenticated else HttpResponseForbidden()
    return check_auth

def create_url(user, view_name):
    base_url = reverse(view_name)
    print(user)
    url = base_url + str(user.id) + "/"
    return url

def decode_data(body):
    return json.loads(body.decode()) if body else ""
