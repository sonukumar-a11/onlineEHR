from django.urls.conf import path
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('doctors', views.DoctorViewSet)

urlpatterns = router.urls
