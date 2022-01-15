from django.urls.conf import path
from . import views

urlpatterns = [
    # path('api/doctors/<str:doctorid>/me',views.DoctorViewSet.as_view({"get":"me"})),
    path('api/doctors/<str:doctorid>/addpatient',views.PatientAddViewSet.as_view({"post":"addpatient"})),
    path('api/patients/<str:patientid>/details',views.PatientViewSet.as_view()),
    path('api/patients/<str:patientid>/meds',views.MedicationViewSet.as_view()),
    path('api/patients/medicatons/<int:medid>/dose',views.DosageViewSet.as_view({"get":"dose","post":"adddose"})),
    path('api/patients/<str:patientid>/vitaldetails', views.VitalDetailsViewSet.as_view()),
    path('api/patients/<str:patientid>/allergy',views.AllergyDetailsViewSet.as_view()),
    path('api/patient/<str:patientid>/allergy/<int:id>',views.IndAllergyViewSet.as_view()),
    path('api/doctors/<str:patientid>/socialhistory',views.SocialViewSet.as_view()),
    path('api/doctors/<str:patientid>/problems',views.ProblemViewSet.as_view()),
    path('api/doctors/<str:patientid>/problems/<str:id>',views.IndProblemViewSet.as_view())
]
