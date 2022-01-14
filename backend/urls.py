from django.urls.conf import path
from . import views

urlpatterns = [
    path('api/doctors/<str:doctorid>/me',views.DoctorViewSet.as_view({"get":"me"})),
    path('api/doctors/<str:doctorid>/addpatient',views.PatientViewSet.as_view({"post":"addpatient"})),
    path('api/doctors/<str:patientid>/vitaldetails', views.VitalDetailsViewSet.as_view()),
    path('api/doctors/<str:patientid>/allergy',views.AllergyDetailsViewSet.as_view()),
    path('api/doctors/<str:patientid>/allergy/<int:id>',views.IndAllergyViewSet.as_view())
]
