from django.db.models.fields import UUIDField
from django.http.response import HttpResponse
from django.shortcuts import render, HttpResponse
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import *
from .models import PatientDetails,DoctorDetails,Medication,Dosage
import uuid
#from .serializers import DoctorDetailsSerializer, PatientDetailsSerializer
from rest_framework import status
from django.db.models.query import QuerySet
from rest_framework.views import APIView

class DoctorViewSet(ModelViewSet):
    queryset = DoctorDetails.objects.all()
    serializer_class = DoctorDetailsSerializer
        
    @action(methods=['get'], detail=True)
    def me(self, request, *args, **kwargs):
        target_user = uuid.UUID(kwargs['doctorid'])
        try:
            doctor = DoctorDetails.objects.get(id=target_user)
            serializer = DoctorDetailsSerializer(doctor)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class PatientViewSet(ModelViewSet):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer

    @action(methods=['post'], detail=True)
    def addpatient(self, request, *args, **kwargs):
        target_user = uuid.UUID(kwargs['doctorid'])
        serializer = PatientDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicationViewSet(ModelViewSet):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

    @action(methods=['get','post'], detail=True)
    def meds(self, request, *args, **kwargs):
        if request.method == 'GET':
            target_user = uuid.UUID(kwargs['patientid'])
            print(target_user)
            try:
                patient = PatientDetails.objects.get(id=target_user)
                meds = Medication.objects.get(patient=patient)
                serializer = MedicationSerializer(meds)
                return Response(serializer.data,status=status.HTTP_200_OK)
            except:
                content = {"Not found"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = MedicationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #serializer_class = DosageSerializer
    #queryset = Dosage.objects.all()
    #@action(methods=['post' , 'put' , 'get'], detail=True)

class DosageViewSet(ModelViewSet):
    queryset = Dosage.objects.all()
    serializer_class = DosageSerializer

    @action(methods=['get'], detail=True)
    def dose(self, request, *args, **kwargs):
        if request.method == 'GET':
            target_user = int(kwargs['medid'])
            print(target_user)
            try:
                medication = Medication.objects.get(pk=target_user)
                print(medication)
                dosy = Dosage.objects.get(medication=medication) 
                print(dosy) 
                serializer = DosageSerializer(dosy) 
                print(serializer.data)
                return Response(serializer.data,status=status.HTTP_200_OK)
            except:
                content = {"Not found"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    def adddose(self, request, *args, **kwargs):
            serializer = DosageSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

