from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("GPT_API_KEY"))

def generate_response(prompt, system_instructions, response_schema) -> str:
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
        response_format=response_schema,
    )
    return chat_completion.choices[0].message.content