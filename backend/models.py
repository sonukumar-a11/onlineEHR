import uuid
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from accounts.models import Profile

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
    dob = models.DateField()
    phone_number = PhoneNumberField()
    doctor = models.ForeignKey(Profile, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class VitalDetails(models.Model):
    patient = models.OneToOneField(PatientDetails, on_delete=models.CASCADE)
    weight = models.DecimalField()
    height = models.DecimalField()
    blood_pressure = models.DecimalField(blank=True)
    pulse = models.DecimalField(blank=True)
    date_added = models.DateField(auto_now_add=True)
    temperature = models.DecimalField(blank=True)


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

    patient = models.ForeignKey(PatientDetails, on_delete=models.CASCADE, related_name="patient_allergy")
    substance = models.CharField(max_length=30, null=True, blank=True)
    verification_status = models.CharField(max_length=40, choices=VERIFICATION_STATUS_CHOICE)
    criticality = models.CharField(max_length=40, choices=CRITICALITY_CHOICE)
    type = models.CharField(max_length=40, choices=TYPE_CHOICE)
    comment = models.TextField(blank=True)


class Medication(models.Model):
    patient = models.ForeignKey(PatientDetails, on_delete=models.CASCADE, related_name='patient_med')
    medication_name = models.CharField(max_length=40)
    medication_manufacturer = models.CharField(max_length=40)
    expire = models.DateTimeField()
    amount = models.DecimalField(max_digits=6, decimal_places=2)


class Dosage(models.Model):
    DOSETIMECHOICE = [
        ("Per Day", "1/d"), ("Per Half Day", "1/h"), ("Per Quater Hour", "1/Q")
    ]

    medication = models.OneToOneField(Medication, on_delete=models.CASCADE, related_name='med')
    dose_amount = models.PositiveSmallIntegerField()
    dose_timing = models.CharField(max_length=20, choices=DOSETIMECHOICE)
    dose_description = models.TextField()


class ProblemDetails(models.Model):
    SEVERITIES = [("1", "Mild"), ("2", "Moderate"), ("3", "Severe")]
    STATUS = [("A", "Active"), ("R", "Resolved")]
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
    problem_name = models.TextField()
    severity = models.CharField(max_length=10, choices=SEVERITIES, default="Mild")
    status = models.CharField(max_length=15, choices=STATUS, default="Active")
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    patient = models.ForeignKey(PatientDetails, on_delete=models.CASCADE, related_name="problem_patient")


class SocialHistory(models.Model):
    SMOKE_STATUS = [
        ("1", "Never Smoked"),
        ("2", "Current Smoker"),
        ("3", "Former Smoker")
    ]
    DRINK_STATUS = [
        ("1", "Current drinker"),
        ("2", "Former drinker"),
        ("3", "Lifetime Non-drinker")
    ]
    tobacco = models.CharField(choices=SMOKE_STATUS, default="Never Smoked", max_length=100)
    alcohol = models.CharField(choices=DRINK_STATUS, default="Current Drinker", max_length=100)
    patient = models.OneToOneField(PatientDetails, on_delete=models.CASCADE, related_name='patient_smoker')
