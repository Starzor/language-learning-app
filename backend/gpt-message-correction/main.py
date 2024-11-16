import functions_framework
import json
import subprocess
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
shared_dir = os.path.join(current_dir, "shared")
sys.path.append(shared_dir)

from gpt_api_manager import generate_response
from system_prompts import get_check_message_prompt
from schemas import correction_schema

@functions_framework.http
def main(request):
    if request.method == 'OPTIONS':
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)

    if request.method != 'GET':
        response = json.dumps({'error': 'Method Not Allowed'})
        headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return (response, 405, headers)

    language = request.args.get("language")
    message = request.args.get("message")
    
    system_request = get_check_message_prompt(language=language)
    
    try:
        gpt_response = generate_response(prompt=message, system_instructions=system_request, response_schema=correction_schema)

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