export interface Message {
    text: string;
    isUser: boolean;
    isExplanation?: boolean;
}

export default Message