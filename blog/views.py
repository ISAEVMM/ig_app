from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import (ListView, DetailView, CreateView, UpdateView, DeleteView)
from .models import Post
from django.utils import timezone
from django.forms import ValidationError
from datetime import timedelta

def home(request):
    context = {
        "posts": Post.objects.all()
    }
    return render(request, 'home.html', context)

class PostListView(ListView):
    model = Post
    template_name = 'home.html'  
    context_object_name = 'posts'
    ordering = ['-date_posted']

class PostDetailView(DetailView):
    model = Post


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content', 'image']

    def form_valid(self, form):
        user = self.request.user
        now = timezone.now()

        # Проверяем группы пользователя в панели управления
        user_groups = user.groups.values_list('name', flat=True)
        
        is_admin = 'Админ' in user_groups or user.is_superuser
        is_deputy = 'Зам. Админ' in user_groups
        is_moder = 'Модер' in user_groups

        # --- ТВОИ ЛИМИТЫ НА КОЛИЧЕСТВО И ВРЕМЯ ---
        if is_admin:
            cooldown_minutes = 0   
            daily_limit = 999999   # Админ — ограничений нет (дохуя)
        elif is_deputy:
            cooldown_minutes = 0   
            daily_limit = 30       # Зам. Админ — 30 постов в день
        elif is_moder:
            cooldown_minutes = 1   
            daily_limit = 20       # Модер — 20 постов в день
        else:
            cooldown_minutes = 1   
            daily_limit = 10       # Пользователь — 10 постов в день

        # 1. Проверка кулдауна (1 минута для Модеров и Пользователей)
        if cooldown_minutes > 0:
            last_post = Post.objects.filter(author=user).order_by('-date_posted').first()
            if last_post:
                time_passed = now - last_post.date_posted
                cooldown = timedelta(minutes=cooldown_minutes)
                if time_passed < cooldown:
                    remaining_time = int((cooldown - time_passed).total_seconds())
                    form.add_error(None, f"Вы публикуете записи слишком часто. Подождите ещё {remaining_time} сек.")
                    return self.form_invalid(form)

        # 2. Проверка лимита количества постов в сутки
        start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
        posts_today_count = Post.objects.filter(author=user, date_posted__gte=start_of_day).count()
        
        if posts_today_count >= daily_limit:
            if is_admin:
                pass
            else:
                form.add_error(None, f"Вы исчерпали лимит публикаций. Для вашей роли доступно максимум {daily_limit} постов в день.")
                return self.form_invalid(form)

        form.instance.author = user
        return super().form_valid(form)


class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content', 'image']

    def form_valid(self, form):
        return super().form_valid(form)
    
    def test_func(self):
        post = self.get_object()
        user = self.request.user
        user_groups = user.groups.values_list('name', flat=True)
        
        # Полный доступ к редактированию для управляющего состава
        if user == post.author or user.is_superuser or 'Админ' in user_groups or 'Зам. Админ' in user_groups or 'Модер' in user_groups:
            return True
        return False


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/'

    def test_func(self):
        post = self.get_object()
        user = self.request.user
        user_groups = user.groups.values_list('name', flat=True)
        
        # Полный доступ к удалению для управляющего состава
        if user == post.author or user.is_superuser or 'Админ' in user_groups or 'Зам. Админ' in user_groups or 'Модер' in user_groups:
            return True
        return False
    

def about(request):
    return render(request, 'about.html', {'title': 'О моём блоге'})