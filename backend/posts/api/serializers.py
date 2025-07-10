from rest_framework.serializers import ModelSerializer, ReadOnlyField, IntegerField, SerializerMethodField
from ..models import Post, Comment

class PostSerializer(ModelSerializer):
    author_username = ReadOnlyField(source='author.username')
    comments_count = IntegerField(source='comments.count', read_only=True)
    avatar = SerializerMethodField()

    def get_avatar(self, obj):
        profile = getattr(obj.author, 'profile', None)
        if profile and profile.avatar:
            return profile.avatar.url
        return None

    class Meta:
        model = Post
        fields = (
            'id', 'title', 'body', 'author', 'author_username', 'avatar',
            'created_at', 'updated_at', 'comments_count'
        )
        read_only_fields = ('author', 'created_at', 'updated_at')

class CommentSerializer(ModelSerializer):
    author_username = ReadOnlyField(source='author.username')
    avatar = SerializerMethodField()

    def get_avatar(self, obj):
        profile = getattr(obj.author, 'profile', None)
        if profile and profile.avatar:
            return profile.avatar.url
        return None

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'author_username', 'avatar', 'body', 'created_at', 'updated_at')
        read_only_fields = ('author', 'created_at', 'updated_at')

