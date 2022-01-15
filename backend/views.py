from django.db.models.fields import UUIDField
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from accounts.models import Profile
# from .serializers import DoctorDetailSerializer
from .models import  PatientDetails, VitalDetails, Allergy, Medication,Dosage, ProblemDetails, SocialHistory
import uuid
from .serializers import  PatientDetailsSerializer, VitalDetailsSerializer, AllergySerializer, MedicationSerializer, DosageSerializer, ProblemDetailsSerializer, SocialHistorySerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from backend import serializers


class IndAllergyViewSet(APIView):
    def post(self,request,patientid,id):
        serializer_class = AllergySerializer
        patientid = uuid.UUID(patientid)
        id = int(id)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        allergydetail = Allergy.objects.get(pk=id)
        
        data=request.data
        data['patient']=patientid
        serializer = AllergySerializer(allergydetail,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class AllergyDetailsViewSet(APIView):

    def get(self,request,patientid):
        serializer_class = AllergySerializer
        patientid = uuid.UUID(patientid)
        patient = None
        
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        
        try:
            allergydetails = Allergy.objects.filter(patient=patient)
            return Response(AllergySerializer(allergydetails, many=True).data, status=status.HTTP_200_OK)
        except:
            content = {'Allergy details not found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)


    def post(self,request,patientid):
        serializer_class = AllergySerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        
        data=request.data
        data['patient']=patientid
        serializer = AllergySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VitalDetailsViewSet(APIView):
    
    def get(self, request, patientid):
        serializer_class = VitalDetailsSerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        try:
            vitaldetails = VitalDetails.objects.get(patient=patient)
            return Response(VitalDetailsSerializer(vitaldetails).data, status=status.HTTP_200_OK)
        except:
            content = {'Vital details not found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)


    def post(self, request, patientid):
        serializer_class = VitalDetailsSerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        
        try:
            vitaldetails = VitalDetails.objects.get(patient=patient)
            serializer = VitalDetailsSerializer(vitaldetails, data=request.data)
            print(vitaldetails)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            data=request.data
            data['patient']=patientid
            print(data)
            serializer = VitalDetailsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


# class DoctorViewSet(ModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = DoctorDetailsSerializer
        
#     @action(methods=['get'], detail=True)
#     def me(self, request, *args, **kwargs):
#         target_user = uuid.UUID(kwargs['doctorid'])
#         try:
#             doctor = DoctorDetails.objects.get(id=target_user)
#             serializer = DoctorDetailsSerializer(doctor)
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         except:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class PatientAddViewSet(ModelViewSet):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientDetailsSerializer

    @action(methods=['post'], detail=True)
    def addpatient(self, request, *args, **kwargs):
        target_user = uuid.UUID(kwargs['doctorid'])
        
        data = request.data
        data['doctor']=target_user

        serializer = PatientDetailsSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientViewSet(APIView):  
    def get(self, request,patientid):
        serializer_class = PatientDetailsSerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
            return Response(PatientDetailsSerializer(patient).data,status=status.HTTP_200_OK)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, patientid):
        serializer_class = PatientDetailsSerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
            serializer = PatientDetailsSerializer(patient, data=request.data)
            # print(vitaldetails)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
    

class MedicationViewSet(APIView):

    def get(self, request, patientid):
        serializer_class = MedicationSerializer
        patientid = uuid.UUID(patientid)
        try:
            patient = PatientDetails.objects.get(id=patientid)
            meds = Medication.objects.filter(patient=patient)
            serializer = MedicationSerializer(meds, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            content = {"Not found"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request, patientid):
        data=request.data
        data['patient']=patientid
        serializer = MedicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

class DosageViewSet(ModelViewSet):
    queryset = Dosage.objects.all()
    serializer_class = DosageSerializer

    @action(methods=['get'], detail=True)
    def dose(self, request, *args, **kwargs):
            target_user = int(kwargs['medid'])
            try:
                medication = Medication.objects.get(pk=target_user)
                dosy = Dosage.objects.get(medication=medication) 
                serializer = DosageSerializer(dosy) 
                return Response(serializer.data,status=status.HTTP_200_OK)
            except:
                content = {"Not found"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    def adddose(self, request, *args, **kwargs):
            target_user = int(kwargs['medid'])
            data=request.data
            data['medication']=target_user
            serializer = DosageSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProblemViewSet(APIView):
    def get(self, request, patientid):
        serializer_class = ProblemDetailsSerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        try:
            problemdetails = ProblemDetails.objects.filter(patient=patient)
            return Response(ProblemDetailsSerializer(problemdetails,many=True).data, status=status.HTTP_200_OK)
        except:
            content = {'Problem details not found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)


    def post(self, request, patientid):
        serializer_class = ProblemDetailsSerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
            data=request.data
            data['patient'] = patientid
            serializer = ProblemDetailsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

class IndProblemViewSet(APIView):
    def post(self, request, patientid, id):
        serializer_class = ProblemDetailsSerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            problem = ProblemDetails.objects.get(id=id)
            data=request.data
            data['patient'] = patientid
            serializer = ProblemDetailsSerializer(problem,data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
    
class SocialViewSet(APIView):
    def get(self, request, patientid):
        serializer_class = SocialHistorySerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        try:
            socialdetails = SocialHistory.objects.get(patient=patient)
            return Response(SocialHistorySerializer(socialdetails).data, status=status.HTTP_200_OK)
        except:
            content = {'social details not found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)


    def post(self, request, patientid):
        serializer_class = SocialHistorySerializer
        patientid = uuid.UUID(patientid)
        patient = None
        try:
            patient = PatientDetails.objects.get(id=patientid)
        except:
            content = {'Patient does not exist'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        
        try:
            socialdetails = SocialHistory.objects.get(patient=patient)
            data=request.data
            data['patient']=patientid
            serializer = SocialHistorySerializer(socialdetails, data=data)
            # print(vitaldetails)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            data=request.data
            data['patient']=patientid
            print(data)
            serializer = SocialHistorySerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

