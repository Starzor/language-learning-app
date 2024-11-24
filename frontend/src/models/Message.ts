export interface WordTrio {
    word: string;
    latin?: string;
    translated: string;
}

export interface Message {
    text: string;
    isUser: boolean;
    vocabulary?: Array<WordTrio>;
    translation?: string;
    language?: string;
    correction?: string;
    incorrectText?: string;
    reformed?: string;
    isError?: boolean;
    id: number;
}