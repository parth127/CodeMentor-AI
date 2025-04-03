import redis
import json
import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables
load_dotenv()

# Configure Redis client
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    db=0,
    decode_responses=True  # Automatically decode responses to strings
)

async def get_cached_response(prompt: str) -> Optional[str]:
    cached = redis_client.get(f"ai_response:{prompt}")
    return cached.decode() if cached else None

async def cache_response(prompt: str, response: str, expire_time: int = 3600):
    redis_client.setex(f"ai_response:{prompt}", expire_time, response)

def get_cached_response(key: str):
    """Retrieve cached response from Redis."""
    cached_response = redis_client.get(key)
    if cached_response:
        return json.loads(cached_response)  # Return as a dictionary
    return None

def cache_response(key: str, response: dict, expire_time: int = 3600):
    """Cache the response in Redis."""
    redis_client.setex(key, expire_time, json.dumps(response))
