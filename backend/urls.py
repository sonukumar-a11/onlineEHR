from django.urls.conf import path
from . import views

urlpatterns = [
    path('api/doctors/<str:doctorid>/me',views.DoctorViewSet.as_view({"get":"me"})),
    path('api/doctors/<str:doctorid>/addpatient',views.PatientViewSet.as_view({"post":"addpatient"})),
    path('api/doctors/<str:patientid>/meds',views.MedicationViewSet.as_view({"post":"addpatient"})),
    path('api/patients/<int:medid>/dose',views.DosageViewSet.as_view({"get":"dose","post":"adddose"}))
]
