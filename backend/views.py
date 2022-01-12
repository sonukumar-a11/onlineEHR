from django.http.response import HttpResponse
from django.shortcuts import render, HttpResponse
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
# from .serializers import DoctorDetailSerializer
from .models import DoctorDetails


# # Create your views here.
# class DoctorViewSet(ModelViewSet):
#     queryset = DoctorDetails.objects.all()
#     serializer_class = DoctorDetailSerializer

