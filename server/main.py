from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user_routes, ai_routes, conversation_routes

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(user_routes.router, prefix="/api/v1/users")
app.include_router(ai_routes.router, prefix="/api/v1/ai")
app.include_router(conversation_routes.router, prefix="/api/v1/conversations")

@app.get("/")
def read_root():
    return {"message": "Welcome to the CodeMentor AI Assistant!"}

# Add more endpoints for LLM interactions here
