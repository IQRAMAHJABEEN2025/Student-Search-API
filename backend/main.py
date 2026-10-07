import os

from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import bcrypt


# Load environment variables
load_dotenv()


app = FastAPI()


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# MongoDB Connection
# =========================================================

MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGODB_URI)

# Database
db = client["student_db"]

# Collections
students_collection = db["students"]
users_collection = db["users"]


# =========================================================
# Test MongoDB Connection
# =========================================================

try:
    client.admin.command("ping")
    print("MongoDB Atlas connected successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)


# =========================================================
# STUDENT APIs
# =========================================================

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


# =========================================================
# AUTHENTICATION
# =========================================================

# Register user
@app.post("/auth/register")
def register_user(user: dict = Body(...)):

    full_name = user.get("fullName")
    email = user.get("email")
    password = user.get("password")

    # Validate required fields
    if not full_name or not email or not password:
        return {
            "success": False,
            "message": "Full name, email and password are required"
        }

    # Check if email already exists
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        return {
            "success": False,
            "message": "Email already registered"
        }

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # Create user document
    new_user = {
        "fullName": full_name,
        "email": email,
        "password": hashed_password.decode("utf-8")
    }

    # Insert user into MongoDB
    result = users_collection.insert_one(new_user)

    return {
        "success": True,
        "message": "Account created successfully",
        "id": str(result.inserted_id)
    }