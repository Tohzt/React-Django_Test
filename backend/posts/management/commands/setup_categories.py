from django.core.management.base import BaseCommand
from posts.models import Category

class Command(BaseCommand):
    help = 'Set up default forum categories'

    def handle(self, *args, **options):
        categories = [
            {
                'name': 'General Discussion',
                'description': 'General topics and discussions',
                'slug': 'general',
                'order': 1
            },
            {
                'name': 'Help & Support',
                'description': 'Get help and support from the community',
                'slug': 'help',
                'order': 2
            },
            {
                'name': 'Announcements',
                'description': 'Important announcements and updates',
                'slug': 'announcements',
                'order': 0
            },
            {
                'name': 'Off Topic',
                'description': 'Non-technical discussions and chit-chat',
                'slug': 'off-topic',
                'order': 3
            }
        ]

        for cat_data in categories:
            category, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created category: {category.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Category already exists: {category.name}')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully set up forum categories')
        ) 