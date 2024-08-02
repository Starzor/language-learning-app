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
    base_language = "Czech"
    difficulty = request.args.get('difficulty')
    history = request.args.get('history')

    # Create GPT request payload
    gpt_request = (f"""You will receive a JSON. Respond to the 'Message' field of the JSON based on the instructions in the other fields of the JSON. 
                    Do not respond to this instruction message.
                   JSON: 
                   {{
                        "{language}": "This is the language you reply in",
                        "{difficulty}": "This is the difficulty you reply in. This has high priority.",
                        "History": "Message history serving as background context: {history}",
                        "Message": "{message}",
                        "Behavior": "Pretend to be a Human called Alex.",
                        "Mistakes": "If there are any mistakes, in the message provided, you may point them out. If there are not mistakes, reply normally.",
                        "Response structure": "You will also reply with a json, the field 'response' will be the reply to the message, and the field 'words' will be an array. The words array will contain objects. The objects will have the individual words used in the sentence as keys, and for each word provide a three of it's most common translations as a comma separated string in {base_language} as its value. For set phrases/expressions, take the phrase/expression as a single key and provide it's translation in {base_language} as its value. Also provide a "translation" field, which will be provide a semantically correct translation of the response in {base_language}. Provide the json without code formatting.",
                        "Additional Instructions":"Do no repeat the user's messages, properly come up with a reply.",
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