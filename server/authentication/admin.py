from django.contrib import admin
from authentication.models import User

# custome user admin model 
class CustomUserAdmin(admin.ModelAdmin):
    model = User

admin.site.register(User, CustomUserAdmin)