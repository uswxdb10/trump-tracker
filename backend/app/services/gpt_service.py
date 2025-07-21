import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def summarize_text(text: str):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Summarize this executive order briefly."},
            {"role": "user", "content": text}
        ],
        max_tokens=200,
        temperature=0.5,
    )
    return response['choices'][0]['message']['content']
