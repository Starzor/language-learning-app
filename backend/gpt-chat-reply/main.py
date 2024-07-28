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
    difficulty = request.args.get('difficulty')
    history = request.args.get('history')

    # Create GPT request payload
    gpt_request = (f"""You will receive a JSON. Respond to the 'Message' field of the JSON based on the instructions in the other fields of the JSON. 
                    Do not respond to this instruction message.
                   JSON: 
                   {{
                        "{language}": "This is the language you reply in",
                        "{difficulty}": "This is the difficulty you reply in",
                        "History": "Message history serving as background context: {history}",
                        "Message": "{message}",
                        "Additional instructions": "If there are any mistakes, in the message provided, you may point them out.",
                    }} """
                   )

    try:
        # Call the GPT API
        gpt_response = generate_response(gpt_request)
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