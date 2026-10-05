import os

from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi import FastAPI , Body
from fastapi.middleware.cors import CORSMiddleware


# Load environment variables
load_dotenv()

app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# MongoDB connection
MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGODB_URI)

# Database
db = client["student_db"]

# Collection
students_collection = db["students"]


# Test MongoDB connection
try:
    client.admin.command("ping")
    print("MongoDB Atlas connected successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)


# Create student
@app.post("/students")
def create_student(student: dict = Body(...)):
    result = students_collection.insert_one(student)
    return {
        "message": "Student inserted successfully",
        "id": str(result.inserted_id)
    }

# Get students
@app.get("/students")
def get_students():
    students = list(students_collection.find())

    for student in students:
        student["_id"] = str(student["_id"])

    return students