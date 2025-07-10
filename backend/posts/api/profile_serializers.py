from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import UserProfile, Post
from .serializers import PostSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    post_count = serializers.ReadOnlyField()
    
    class Meta:
        model = UserProfile
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'bio', 'avatar', 'website', 'location', 'birth_date',
            'created_at', 'updated_at', 'post_count'
        )
        read_only_fields = ('id', 'created_at', 'updated_at', 'post_count')

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    email = serializers.EmailField(source='user.email', required=False)
    
    class Meta:
        model = UserProfile
        fields = (
            'bio', 'avatar', 'website', 'location', 'birth_date',
            'first_name', 'last_name', 'email'
        )
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        
        # Update user fields
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()
        
        # Update profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance

class UserProfileDetailSerializer(UserProfileSerializer):
    recent_posts = serializers.SerializerMethodField()
    
    class Meta(UserProfileSerializer.Meta):
        fields = UserProfileSerializer.Meta.fields + ('recent_posts',)
    
    def get_recent_posts(self, obj):
        posts = obj.user.posts.all().order_by('-created_at')[:5]
        return PostSerializer(posts, many=True).data 