def getSystemPrompt(language: str, difficulty: str, history: str, base_language: str = "Czech"):
    return (f"""
                {{
                    "{language}": "This is the language you reply in",
                    "{difficulty}": "This is the CEFR level you reply with.
                    "History": "Previous message history: {history}",
                    "Behavior": "Pretend to be a human, who is helpful and goes along any roleplay the user suggests. You may call yourself Alex.",
                    "Response structure": "'response' will be the reply to the user message. 'words' will be an array, it will have the individual words used in the sentence and for each word provide a three of it's most common translations as a comma separated string in {base_language}. 'translation' will translate 'response' to {base_language}. Provide the json without code formatting.",
                    "Additional Instructions":"Do no repeat the user's messages, properly come up with a reply.",
                }} 
            """)

response_schema = {
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
                            },
                            "required" : ["word", "translated"],
                            "additionalProperties": False
                        }                          
                    },
                    "translation": {
                        "type": "string"
                    }
                },
                "required" : ["response", "words", "translation"],
                "additionalProperties": False
            }
        }
    }