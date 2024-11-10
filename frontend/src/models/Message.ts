interface WordPair {
    word: string;
    translated: string;
}

export interface Message {
    text: string;
    isUser: boolean;
    vocabulary?: Array<WordPair>;
    translation?: string;
    language?: string;
}