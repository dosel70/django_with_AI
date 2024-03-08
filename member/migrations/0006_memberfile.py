# Generated by Django 5.0.2 on 2024-03-08 09:33

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file', '0001_initial'),
        ('member', '0005_alter_member_member_phone_delete_memberfile'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberFile',
            fields=[
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('file', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, primary_key=True, serialize=False, to='file.file')),
                ('path', models.ImageField(upload_to='member/%Y/%m/%d')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='member.member')),
            ],
            options={
                'db_table': 'tbl_member_file',
            },
        ),
    ]
