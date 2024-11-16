import functions_framework
import json
import subprocess
import sys
import os
import gzip

current_dir = os.path.dirname(os.path.abspath(__file__))
shared_dir = os.path.join(current_dir, "shared")
sys.path.append(shared_dir)

from gpt_api_manager import generate_response
from system_prompts import get_test_prompt
from schemas import test_response_schema

@functions_framework.http
def main(request):
    if request.method == 'OPTIONS':
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Content-Encoding",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)

    if request.method != 'POST':
        response = json.dumps({'error': 'Method Not Allowed'})
        headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return (response, 405, headers)

    try:
        compressed_data = request.get_data()
        decompressed_data = gzip.decompress(compressed_data)

        json_data = json.loads(decompressed_data)

        answers = "\n".join(json_data["answers"])
        test = json_data["test"]

        system_request = get_test_prompt(test=test)
        gpt_response = generate_response(prompt=answers, system_instructions=system_request, response_schema=test_response_schema)

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