"""
URL configuration for instagramProject project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from users import views as user_views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Основное приложение
    path('', include('blog.urls')),
    
    # Авторизация и пользователи
    path('register/', user_views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(
        template_name='users/login.html'), 
        name='login'
    ),
    path('profile/', user_views.profile, name='profile'),
    path('logout/', auth_views.LogoutView.as_view(
        template_name='users/logout.html'), 
        name='logout'
    ),
]

# ====================== СТАТИКА И МЕДИА ======================
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)