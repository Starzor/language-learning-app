from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("GPT_API_KEY"))

def generate_response(prompt) -> str:
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-4o",
    )
    return chat_completion.choices[0].message.content