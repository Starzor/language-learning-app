import functions_framework
import json
from gpt_api_manager import generate_response
from helpers import getSystemPrompt
import subprocess

@functions_framework.http
def main(request):
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)

    # Handle non-OPTIONS requests
    if request.method != 'GET':
        response = json.dumps({'error': 'Method Not Allowed'})
        headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return (response, 405, headers)

    # Extract query parameters
    language = request.args.get('language')
    message = request.args.get('message')
    difficulty = request.args.get('difficulty')
    history = request.args.get('history')

    # Create GPT request payload
    system_request = getSystemPrompt(language=language, difficulty=difficulty, history=history)
    
    try:
        # Call the GPT API
        gpt_response = generate_response(prompt=message, system_instructions=system_request)
        response = json.dumps(gpt_response)
        headers = {
            "Access-Control-Allow-Origin": "*",
        }
        return (response, 200, headers)
    except subprocess.CalledProcessError as e:
        response = json.dumps({'error': str(e)})
        headers = {
            "Access-Control-Allow-Origin": "*",
        }
        return (response, 500, headers)