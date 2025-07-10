from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from ..models import UserProfile
from .profile_serializers import (
    UserProfileSerializer, 
    UserProfileUpdateSerializer, 
    UserProfileDetailSerializer
)

class ProfileListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get list of all user profiles"""
        profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(profiles, many=True)
        return Response(serializer.data)

class ProfileDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, username):
        """Get detailed profile by username"""
        try:
            user = User.objects.get(username=username)
            profile = user.profile
            serializer = UserProfileDetailSerializer(profile)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

class CurrentUserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get(self, request):
        """Get current user's profile"""
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileDetailSerializer(profile)
        return Response(serializer.data)
    
    def put(self, request):
        """Update current user's profile"""
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileUpdateSerializer(profile, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(UserProfileDetailSerializer(profile).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPostsView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, username):
        """Get all posts by a specific user"""
        try:
            user = User.objects.get(username=username)
            posts = user.posts.all().order_by('-created_at')
            
            # Simple pagination
            page = int(request.query_params.get('page', 1))
            per_page = 10
            start = (page - 1) * per_page
            end = start + per_page
            
            posts_page = posts[start:end]
            
            from .serializers import PostSerializer
            serializer = PostSerializer(posts_page, many=True)
            
            return Response({
                'posts': serializer.data,
                'total_posts': posts.count(),
                'current_page': page,
                'has_next': end < posts.count(),
                'has_previous': page > 1
            })
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, 
                status=status.HTTP_404_NOT_FOUND
            ) 