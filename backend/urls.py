from django.urls.conf import path
from . import views

urlpatterns = [
    path('demo/',views.demo)
]
