from rest_framework.serializers import ModelSerializer, ReadOnlyField, IntegerField, SerializerMethodField
from ..models import Post, Comment, Tag, Category

class CategorySerializer(ModelSerializer):
    posts_count = IntegerField(source='posts.count', read_only=True)
    last_post = SerializerMethodField()
    
    def get_last_post(self, obj):
        last_post = obj.posts.order_by('-created_at').first()
        if last_post:
            return {
                'id': last_post.id,
                'title': last_post.title,
                'author_username': last_post.author.username if last_post.author else None,
                'created_at': last_post.created_at
            }
        return None
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'slug', 'order', 'is_active', 'created_at', 'posts_count', 'last_post')

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')

class PostSerializer(ModelSerializer):
    author_username = ReadOnlyField(source='author.username')
    comments_count = IntegerField(source='comments.count', read_only=True)
    avatar = SerializerMethodField()
    tags = SerializerMethodField()
    category_name = ReadOnlyField(source='category.name')
    category_slug = ReadOnlyField(source='category.slug')

    def get_avatar(self, obj):
        profile = getattr(obj.author, 'profile', None)
        if profile and profile.avatar:
            return profile.avatar.url
        return None

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def to_internal_value(self, data):
        tags = data.pop('tags', [])
        ret = super().to_internal_value(data)
        ret['tags'] = tags
        return ret

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        post = super().create(validated_data)
        self._save_tags(post, tags)
        return post

    def update(self, instance, validated_data):
        tags = validated_data.pop('tags', None)
        post = super().update(instance, validated_data)
        if tags is not None:
            self._save_tags(post, tags)
        return post

    def _save_tags(self, post, tags):
        tag_objs = []
        for tag_name in tags:
            tag_obj, _ = Tag.objects.get_or_create(name=tag_name)
            tag_objs.append(tag_obj)
        post.tags.set(tag_objs)

    class Meta:
        model = Post
        fields = (
            'id', 'title', 'body', 'author', 'author_username', 'avatar',
            'created_at', 'updated_at', 'comments_count', 'tags',
            'category', 'category_name', 'category_slug', 'is_sticky', 
            'is_locked', 'views_count'
        )
        read_only_fields = ('author', 'created_at', 'updated_at', 'views_count')

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

