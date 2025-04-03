# server/utils/gemini_model.py

# Import necessary libraries
import os
from dotenv import load_dotenv
import google.generativeai as genai
from typing import AsyncGenerator
import asyncio
from logger import logger
from .redis_cache import get_cached_response, cache_response

# Load environment variables from .env file
load_dotenv()

# Get API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

# Configure the API
try:
    genai.configure(api_key=api_key)
    # Verify API key and available models
    model_list = genai.list_models()
except Exception as e:
    logger.error(f"Error configuring Gemini API: {str(e)}")
    raise

async def generate_gemini_response_stream(prompt: str) -> AsyncGenerator[str, None]:
    try:
        # Check for cached response in Redis
        cached_response = get_cached_response(f"gemini_response:{prompt}")
        if cached_response:
            logger.info("Returning cached response.")
            yield cached_response['text']  # Return the cached response
            return

        # Proceed with generating a new response if no cached response is found
        model = genai.GenerativeModel('models/gemini-2.0-flash')
        
        if not prompt or not isinstance(prompt, str):
            raise ValueError("Invalid prompt provided")
        
        response = model.generate_content(prompt)
        
        # Cache the new response
        cache_response(f"gemini_response:{prompt}", {'text': response.text})

        yield response.text

    except Exception as e:
        logger.error(f"Error in generate_gemini_response_stream: {str(e)}")
        yield f"Error: {str(e)}"

def generate_gemini_response_model(prompt: str) -> str:
    try:
        # Check for cached response in Redis
        cached_response = get_cached_response(f"gemini_response:{prompt}")
        if cached_response:
            logger.info("Returning cached response.")
            return cached_response['text']  # Return the cached response

        model = genai.GenerativeModel('models/gemini-2.0-flash')
        response = model.generate_content(prompt)
        # Cache the new response
        cache_response(f"gemini_response:{prompt}", {'text': response.text})

        return response.text if hasattr(response, 'text') else response
    except Exception as e:
        logger.error(f"Error in generate_gemini_response_model: {str(e)}")
        raise RuntimeError(f"An error occurred while generating a response: {str(e)}")
