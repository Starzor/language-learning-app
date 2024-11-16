message_response_schema = {
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

correction_schema = {
    "type": "json_schema",
        "json_schema": {
            "name": "chat_response",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "correction": {
                        "type": "string"
                    },
                    "original": {
                        "type": "string"
                    }
                },
                "required" : ["correction", "original"],
                "additionalProperties": False
            }
        }
    }
