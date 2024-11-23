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
                                "latin" : {
                                    "type": "string"
                                },
                                "translated": {
                                    "type": "string"
                                }
                            },
                            "required" : ["word", "latin", "translated"],
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

test_response_schema = {
    "type": "json_schema",
        "json_schema": {
            "name": "chat_response",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "CEFR": {
                        "type": "string"
                    },
                },
                "required" : ["CEFR"],
                "additionalProperties": False
            }
        }
    }

text_reform_schema = {
    "type": "json_schema",
        "json_schema": {
            "name": "chat_response",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "reformed_sentence": {
                        "type": "string"
                    },
                },
                "required" : ["reformed_sentence"],
                "additionalProperties": False
            }
        }
    }