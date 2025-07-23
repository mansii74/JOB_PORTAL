from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import (
    ResumeUploadView,
    MatchResumeView,
    ResumeJobMatchView,
    ResumeListView,
    get_resume_by_id,
    JobListView,
    AdzunaJobListView,
    MatchResumeWithAdzunaView , # Make sure this view is defined and imported
    RegisterView,
    LoginView,
    ProfileView,
)

urlpatterns = [
    path('resumes/upload/', ResumeUploadView.as_view()),  # Upload a resume
    path('jobs/', JobListView.as_view()),  # List all the jobs or to create a new job
    path('resumes/', ResumeListView.as_view()),  # List all resumes
    path('resume/match/', MatchResumeView.as_view()),  # Match resume to a specific job
    path('resumes/<int:pk>/', get_resume_by_id, name='get_resume_by_id'),  # Get a specific resume by ID 
    path('resumes/<int:resume_id>/match_jobs/', ResumeJobMatchView.as_view(), name='resume-match-jobs'), 
    path('online-jobs/', AdzunaJobListView.as_view(), name='match-local-jobs'),  # renamed to avoid duplicate
    path('match-online-jobs/', MatchResumeWithAdzunaView.as_view(), name='match-online-jobs'),  # unique name and 
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
]