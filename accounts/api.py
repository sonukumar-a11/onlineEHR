from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.conf import settings

from .serializers import (
    GetUserSerializer,
    RegisterSerializer,
    LoginSerializer,
    ProfileSerializer,
    UserValidationSer
)

from .models import Profile, User
from django.contrib.auth import get_user_model
User = get_user_model()


class GetUserAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.get(email=email)

        refresh = RefreshToken.for_user(user)
        myserializeddata = GetUserSerializer(user)
        data = myserializeddata.data
        data['token'] = {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

        return Response(
            data, status=status.HTTP_201_CREATED
        )


class RegisterAPI(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        profile_data = {"speciality": request.data["speciality"], "gender": request.data["gender"]}

        data = request.data

        user_serializer = self.get_serializer(data=data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        profile_data["user"] = user.id

        prfile_serialize = ProfileSerializer(data=profile_data)
        prfile_serialize.is_valid(raise_exception=True)
        prfile_serialize.save()

        refresh = RefreshToken.for_user(user)
        myserializeddata = GetUserSerializer(user)
        data = myserializeddata.data

        data['token'] = {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

        return Response(
            data, status=status.HTTP_201_CREATED
        )


class ProfileAPI(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


# api to check the unique username and email
class userValidtaionApi(generics.GenericAPIView):
    serializer_class = UserValidationSer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            "success": True
        })
