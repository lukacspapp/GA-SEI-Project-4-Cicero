from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(
            name = 'admin',
            email = 'admin@mail.com',
            is_staff = True,
            is_superuser = True,
            phone = 123,
            )
        user.set_password('123')
        user.save() 

    dependencies = [
        
    ]

    operations = [
        migrations.RunPython(seed_data),
    ]

