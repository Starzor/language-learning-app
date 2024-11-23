def get_system_prompt(language: str, difficulty: str, topic: str, history: str = "", words: str = "", base_language: str = "Czech"):
    return (f"""
                {{
                    "{language}": "This is the language you reply in, regardless of the user's language.",
                    "{difficulty}": "This is the CEFR level you reply with.
                    "History": "Previous message history: {history}",
                    "Behavior": {get_description_by_topic(topic)},
                    "{words}": "The user is unfamiliar with these. Try to use them more.",
                    "Response structure": "'response' will be the reply to the user message. 'words' will be an array, it will have the individual words used in the sentence and for each word provide it written in the Latin script and also provide three of it's most common translations as a comma separated string in {base_language}. 'translation' will translate 'response' to {base_language}.,
                    "Additional Instructions":"Do no repeat the user's messages, properly come up with a reply.",
                }} 
            """)

def get_check_message_prompt(language: str):
    return (f"""
                You will receive a user message in {language}. If the message contains any sort of grammatical mistake or a typo, you will enter the corrected message into the 'correction' field. For the corrected words, format them into an html span with the className 'corrected'. Also return the original sentence with the incorrect words formatted into an html span 'incorrect' If there are no mistakes, leave the 'correction' field empty.
            """)

def get_test_prompt(test: str):
    return f""" 
                Evaluate the user's answers to the questions in the following json: {test}. Return only the CEFR level from A1-C2 which is the most adequate for the user's answers.
            """

topics_with_descriptions = [
    {
        "topic": "Objednávka v Restauraci",
        "description": "You are to fulfill the role of the waiter. A customer just entered and you are to greet them and help them with ordering and responding to their requests."
    },
    {
        "topic": "Ptaní se na cestu",
        "description": "You are to fulfill the role of a person being asked for directions. Provide directions for a place the user asks."
    },
    {
        "topic": "Rezervace hotelu",
        "description": "You are the hotel employee with which the user is trying to make a hotel reservation."
    },
    {
        "topic": "Překvap mě! (Náhodné téma)",
        "description": "You will pick a random topic to talk about with the user."
    },
    {   "topic": "empty",
        "description": "Pretend to be a human, who is helpful and goes along any roleplay or topic the user suggests. You may call yourself Alex."
    }
]

language_descriptions = {
    "English": "", 
    "Spanish": "",
    "German": "",
    "French": "",
    "Japanese": "",
    "Russian": ""
    }

def get_reform_prompt():
    return (f"""
                {{
                    "Reformulate the user's message to be more syntactically and grammatically correct and easier to understand.",
                }} 
            """)

def get_description_by_topic(topic_value):
    for item in topics_with_descriptions:
        if item["topic"] == topic_value:
            return item["description"]
    return "Topic not found."