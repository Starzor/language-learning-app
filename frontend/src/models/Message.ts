export interface Message {
    text: string;
    isUser: boolean;
    isExplanation?: boolean;
    isHidden?: boolean;
    isExplained?: boolean;
}

export default Message