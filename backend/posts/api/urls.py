from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet
from .auth_views import RegisterView, LoginView, LogoutView, UserProfileView
from .profile_views import ProfileListView, ProfileDetailView, CurrentUserProfileView, UserPostsView

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)
post_router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('', include(post_router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),
    path('profiles/', ProfileListView.as_view(), name='profile-list'),
    path('profiles/me/', CurrentUserProfileView.as_view(), name='current-profile'),
    path('profiles/<str:username>/', ProfileDetailView.as_view(), name='profile-detail'),
    path('profiles/<str:username>/posts/', UserPostsView.as_view(), name='user-posts'),
]
