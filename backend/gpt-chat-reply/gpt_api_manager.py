from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("GPT_API_KEY"))

def generate_response(prompt, system_instructions) -> str:
    chat_completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": system_instructions,
            },
            {                
                "role": "user",
                "content": prompt,
            }
        ],
        response_format= {
            "type": "json_schema",
            "json_schema": {
                "name": "chat_response",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "response": {
                            "type": "string"
                        },
                        "words": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "word": {
                                        "type": "string"
                                    },
                                    "translated": {
                                        "type": "string"
                                    }
                                }
                            }
                        },
                        "translation": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    )
    return chat_completion.choices[0].message.content