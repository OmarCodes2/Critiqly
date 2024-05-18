from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env
load_dotenv()

def get_openai_response(query):
  # Set your OpenAI API key
  OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
  OPENAI_ENDPOINT = os.getenv("OPENAI_ENDPOINT")

  headers = {
    'Authorization': f'Bearer {OPENAI_API_KEY}',
    'Content-Type': 'application/json'
  }

  payload = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are the coworker of the user, and you are receiving feedback for a code review"
        },
        {
            "role": "user",
            "content": query
        }
    ]
  }

  response = requests.post(OPENAI_ENDPOINT, headers=headers, json=payload)

  if response.status_code == 200:
    ans = response.json()['choices'][0]['message']['content']
    #ans = ans[2:]
    return ans
  else:
    return response
  

#print(get_openai_response("Can you fix line 120, you need to reindex your for loop"))