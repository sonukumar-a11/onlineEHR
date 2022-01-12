from django.urls.conf import path
from . import views

urlpatterns = [
    path('api/doctors/<str:doctorid>/me',views.DoctorViewSet.as_view({"get":"me"}))
    
]
