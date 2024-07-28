import functions_framework
import json
from gpt_api_manager import generate_response
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
    message = request.args.get('message')
    language = request.args.get('language')
    base_language = request.args.get('base_language')

    # Create GPT request payload
    gpt_request = (f"""You will receive a JSON. Explain the vocabulary and grammar used in the 'Message' field of the JSON based on the instructions in the other fields of the JSON. 
                    Do not respond to this instruction message.
                   JSON: 
                   {{
                        "{language}": "This is the original language of the reply. You do not use this to explain.",
                        "{base_language}": "This is the language you provide your explanation in.",
                        "Message": "{message}",
                        "Additional instructions": "",
                    }} """
                   )

    try:
        # Call the GPT API
        gpt_response = generate_response(gpt_request)
        response = json.dumps(gpt_response)
        headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return (response, 200, headers)
    except subprocess.CalledProcessError as e:
        response = json.dumps({'error': str(e)})
        headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return (response, 500, headers)