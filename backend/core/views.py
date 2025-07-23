from rest_framework.views import APIView # for class based view
from rest_framework.response import Response # response from server to client
from rest_framework.parsers import MultiPartParser # parsing data of resume and job description
from .models import Resume, Job  #passing information from document to backend
from .models import Resume, Job, JobApplication 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import ResumeSerializer, JobSerializer, JobApplicationSerializer #converting data into JSON format (serialization - deserialization)
from PyPDF2 import PdfReader
import docx2txt 
import spacy
from rest_framework.generics import ListAPIView
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view # for function based view
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authtoken.models import Token
import requests
from rest_framework.permissions import IsAuthenticated

nlp = spacy.load("en_core_web_sm") # optimizing CPU usage



# Extract text from resume file
def extract_text(file):
    if file.name.endswith(".pdf"):
        reader = PdfReader(file)
        return " ".join([page.extract_text() or '' for page in reader.pages]) # This ensures the function returns the combined text from all PDF pages.
    elif file.name.endswith(".docx"):
        return docx2txt.process(file)
    return "" # If the file is neither a PDF nor a DOCX, the function returns an empty string.

# Integrating AI - NLP Model - This function is ideal for keyword extraction and text analysis tasks in NLP projects, such as summarization, topic modeling, or search engine optimization.
def extract_keywords(text):
    doc = nlp(text.lower()) #converts the entire input text to lowercase — this helps with uniformity
    return set(token.lemma_ for token in doc if token.pos_ in ["NOUN", "PROPN", "VERB", "ADJ"] and not token.is_stop and token.is_alpha)
# return (token.lemma_ for token in doc if ...) - this returns a generator that will yield lemmatized words (base forms like "run" from "running") of selected tokens.
# (and not token.is_stop) - excludes stop words (like “the”, “is”, “and”) — these don't carry important meaning.
# (and token.is_alpha) - includes only alphabetic words — filters out numbers, symbols, punctuation, etc.

# Extract skills from resume file
def extract_skills(text):
    doc = nlp(text.lower())
    return [token.lemma_ for token in doc if token.pos_ in ["NOUN", "PROPN", "VERB", "ADJ"] and not token.is_stop and token.is_alpha]

# MatchResumeView: matches resume with the job and finds the missing keywords
class MatchResumeView(APIView):
    def post(self, request): # sending request to server using POST method
        resume_id = request.data.get('resume_id')
        job_id = request.data.get('job_id')
        
        if not resume_id or not job_id:
            return Response({'error': 'Both resume_id and job_id are required.'}, status = status.HTTP_400_BAD_REQUEST)
        
        
        try:
            resume = Resume.objects.get(id=resume_id)
            job = Job.objects.get(id=job_id)
        except Resume.DoesNotExist:
            return Response({'error: ' 'Resume Not Found.'}, status = status.HTTP_404_NOT_FOUND)
        except Job.DoesNotExist:
            return Response({'error: ' 'Job Not Found.'}, status = status.HTTP_404_NOT_FOUND)
        
        resume_keywords = set(extract_keywords(resume.parsed_text))
        job_keywords = set(extract_keywords(job.description))

        matched = job_keywords & resume_keywords
        missing = job_keywords - resume_keywords
        score = round(len(matched) / len(job_keywords) * 100, 2) if job_keywords else 0.0

        application = JobApplication.objects.create(
            resume=resume,
            job=job,
            matched_score=score,
            missing_keywords=", ".join(missing)
        )
        
        return Response({
            "score": score,
            "matched_keywords": list(matched),
            "missing_keywords": list(missing),
            "message": "Resume matched and scored successfully"
        }, status= status.HTTP_200_OK)
        
# POST Resume and Extract Skills
class ResumeUploadView(APIView):
    parser_classes = [MultiPartParser]
    
    def post(self, request):
        try:
            file = request.FILES['file']
            text = extract_text(file)
            skills = extract_skills(text)
            
            resume = Resume.objects.create(file = file, parsed_text = text)
            return Response({"message": "Resume Uploaded", "skills": skills })
        
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class JobListView(APIView):
    def get(self, request): # get method
        jobs = Job.objects.all().order_by('-created_at')
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    
    def post(self, request): # post method
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class JobPostView(APIView):
    def post(self, request):
        print(request.data)
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Job created successfully"})
        return Response(serializer.errors, status=400)
    
class ResumeListView(ListAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    
def get_resume_by_id(request, pk):
    if request.method == 'GET':
        try:
            resume = Resume.objects.get(pk=pk)
            serializer = ResumeSerializer(resume) 
            return JsonResponse(serializer.data, safe=False) 
        except Resume.DoesNotExist:
            return JsonResponse({'error': 'Resume not found'}, status=404)
        
@api_view(['GET', 'POST']) # function based view
def job_list_create(request):
    if request.method == 'GET':
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
                    
        
        
class ResumeJobMatchView(APIView):
    def get(self, request, resume_id):
        try:
            resume = Resume.objects.get(id=resume_id)
            resume_skills_raw = extract_skills(resume.parsed_text)

            # Normalize resume skills
            resume_skills = set(skill.strip().lower() for skill in resume_skills_raw)

            jobs = Job.objects.all()
            results = []

            for job in jobs:
                # Normalize job skills
                job_skills = set(skill.strip().lower() for skill in job.skills_required.split(","))

                matched = resume_skills & job_skills
                missing = job_skills - resume_skills
                score = round(len(matched) / len(job_skills) * 100, 2) if job_skills else 0

                results.append({
                    "job_id": job.id,
                    "job_title": job.title,
                    "match_score": score,
                    "matched_skills": list(matched),
                    "skills_required": list(job_skills),  # optional
                })

            return Response({"results": results})
        except Resume.DoesNotExist:
            return Response({"error": "Resume not found"}, status=404)


def delete_old_users():
    from django.contrib.auth.models import User
    User.objects.filter(is_superuser=False).delete()

class RegisterView(APIView):
    def post(self, request):
        delete_old_users() 
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        refresh = RefreshToken.for_user(user)

        return Response({'token': str(refresh.access_token)}, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({'token': str(refresh.access_token)})
        else:
            return Response({'detail': 'Invalid credentials'}, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'username': user.username,
            'email': user.email,
            # You can expand this if you have a custom Profile model
        }
        return Response(data)

        
# ---------------- FETCH ONLINE JOBS (ADZUNA) ---------------- #

class AdzunaJobListView(APIView):
    def get(self, request):
        app_id = "7267d741"  # your App ID
        app_key = "4ac1c2cc0aca7d535c9c799f2101fb7e"  # your API key
        country = "in"

        url = f"https://api.adzuna.com/v1/api/jobs/{country}/search/1"
        params = {
            "app_id": app_id,
            "app_key": app_key,
            "results_per_page": 10,
            "content-type": "application/json",
        }

        try:
            res = requests.get(url, params=params)
            data = res.json()

            # Basic transformation
            jobs = []
            for job in data.get("results", []):
                jobs.append({
                    "title": job.get("title"),
                    "description": job.get("description"),
                    "company": job.get("company", {}).get("display_name"),
                    "location": job.get("location", {}).get("display_name"),
                    "redirect_url": job.get("redirect_url"),
                })

            return Response({"results": jobs})
        except Exception as e:
            return Response({"error": str(e)}, status=500)



class MatchResumeWithAdzunaView(APIView):
    def post(self, request):
        resume_id = request.data.get("resume_id")
        query = request.data.get("query", "developer")

        app_id = "7267d741"  # from your image
        app_key = "4ac1c2cc0aca7d535c9c799f2101fb7e"  # from your image
        country = "in"

        if not resume_id:
            return Response({"error": "resume_id is required"}, status=400)

        try:
            resume = Resume.objects.get(id=resume_id)
        except Resume.DoesNotExist:
            return Response({"error": "Resume not found"}, status=404)

        resume_keywords = extract_keywords(resume.parsed_text)

        url = f"https://api.adzuna.com/v1/api/jobs/{country}/search/1"
        params = {
            "app_id": app_id,
            "app_key": app_key,
            "results_per_page": 10,
            "what": query
        }

        try:
            res = requests.get(url, params=params)
            data = res.json()
            results = []

            for job in data.get("results", []):
                job_text = job.get("description", "")
                job_keywords = extract_keywords(job_text)
                matched = resume_keywords & job_keywords
                missing = job_keywords - resume_keywords
                score = round(len(matched) / len(job_keywords) * 100, 2) if job_keywords else 0.0

                results.append({
                    "job_title": job.get("title"),
                    "company": job.get("company", {}).get("display_name"),
                    "score": score,
                    "matched_keywords": list(matched),
                    "missing_keywords": list(missing),
                    "apply_link": job.get("redirect_url"),
                })

            return Response({"results": results})
        except Exception as e:
            return Response({"error": str(e)}, status=500)