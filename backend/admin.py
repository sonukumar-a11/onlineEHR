from django.contrib import admin
from .models import DoctorDetails, PatientDetails
# Register your models here.

admin.site.register(DoctorDetails)
admin.site.register(PatientDetails)