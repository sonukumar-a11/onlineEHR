from django.db import models
from django.core.validators import MinLengthValidator
import uuid


# Create your models here.
class DoctorDetails(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    doctor_name = models.TextField()
    doctor_email = models.TextField()
    doctor_password = models.CharField(max_length=10, validators=[MinLengthValidator(5)])


class PatientDetails(models.Model):
    GENDER_MALE = "M"
    GENDER_FEMALE = "F"
    GENDER_TRANS = "T"
    GENDER_CHOICE = [
        (GENDER_MALE, "Male"),
        (GENDER_FEMALE, "Female"),
        (GENDER_TRANS, "Trans")
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=30)
    email_id = models.EmailField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICE, default=GENDER_MALE)
    address = models.CharField(max_length=255)
    dob = models.DateTimeField()
    phone_number = models.CharField(max_length=10, null=False, blank=False, unique=False)
    doctor = models.ManyToManyField(DoctorDetails, blank=True)



class Allergy(models.Model):
    VERIFICATION_STATUS_CHOICE = [
        ("1", "Suspected"),
        ("2", "Likely"),
        ("3", "Confirmed"),
        ("4", "Resolved"),
        ("5", "Refuted")
    ]
    CRITICALITY_CHOICE = [
        ("1", "LOW"),
        ("2", "MEDIUM"),
        ("3", "HIGH")
    ]
    TYPE_CHOICE = [
        ("1", "Allergy"),
        ("2", "Intolerance")
    ]
    Patient = models.ForeignKey(PatientDetails, on_delete=models.CASCADE, related_name="patient_allergy")
    substance = models.CharField(max_length=30, null=True, blank=True)
    verification_status = models.CharField(max_length=40, choices=VERIFICATION_STATUS_CHOICE)
    criticality = models.CharField(max_length=40, choices=CRITICALITY_CHOICE)
    type = models.CharField(max_length=40, choices=TYPE_CHOICE)
    comment = models.CharField(max_length=255, null=True, blank=True)


class VitalDetails(models.Model):
    patient_id = models.ForeignKey(PatientDetails, on_delete=models.CASCADE)
    weight = models.FloatField()
    height = models.IntegerField()
    bloodpressure = models.FloatField()
    pulse = models.FloatField()
    date_added = models.DateTimeField(auto_now_add=True)
    temperature = models.FloatField()
