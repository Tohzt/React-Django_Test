from django.core.management.base import BaseCommand
from posts.models import Post, Category

class Command(BaseCommand):
    help = 'Assign all posts without a category to General Discussion'

    def handle(self, *args, **options):
        try:
            # Get the General Discussion category
            general_category = Category.objects.get(slug='general')
            
            # Find all posts without a category
            uncategorized_posts = Post.objects.filter(category__isnull=True)
            count = uncategorized_posts.count()
            
            if count == 0:
                self.stdout.write(
                    self.style.WARNING('No uncategorized posts found.')
                )
                return
            
            # Assign them to General Discussion
            uncategorized_posts.update(category=general_category)
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully assigned {count} posts to General Discussion category.')
            )
            
        except Category.DoesNotExist:
            self.stdout.write(
                self.style.ERROR('General Discussion category not found. Please run setup_categories first.')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error: {e}')
            ) 