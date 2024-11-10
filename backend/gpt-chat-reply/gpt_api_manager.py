from openai import OpenAI
from helpers import response_schema;
import os

client = OpenAI(api_key=os.environ.get("GPT_API_KEY"))

def generate_response(prompt, system_instructions) -> str:
    chat_completion = client.chat.completions.create(
        model="gpt-4o-mini",
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
        response_format=response_schema,
    )
    return chat_completion.choices[0].message.content