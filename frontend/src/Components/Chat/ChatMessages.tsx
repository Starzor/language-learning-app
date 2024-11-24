import { useEffect, useRef } from "react";
import { Message } from "../../models/Message";
import "../../styles/Chat.scss";
import Paragraph from "../Reusable/Paragraph";

interface ChatMessagesProps {
  messages: Array<Message>;
  isTesting: boolean;
  isLoadingReform: boolean;
  onTranslateClick: (message: Message) => void;
  onVocabularyClick: (message: Message) => void;
  onCorrectionClick: (message: Message) => void;
  onReformClick: (message: Message, id: number) => void;
  retryResponseRequest: (isRetry: boolean) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTesting,
  isLoadingReform,
  onTranslateClick,
  onVocabularyClick,
  onCorrectionClick,
  onReformClick,
  retryResponseRequest,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatMessages">
      {messages.map((message: Message, index: number) => (
        <div
          key={index}
          className={message.isUser ? "user message" : "bot message"}
        >
          <Paragraph>{message.text}</Paragraph>
          {!message.isUser && !isTesting && !message.isError && (
            <>
              <button
                className="helperText"
                onClick={() => onTranslateClick(message)}
              >
                Přeložit
              </button>

              <button
                className="helperText"
                onClick={() => onVocabularyClick(message)}
              >
                Slovník
              </button>
            </>
          )}
          {!message.isUser &&
            !isTesting &&
            message.isError &&
            index == messages.length - 1 && (
              <button
                className="helperText"
                onClick={() => retryResponseRequest(true)}
              >
                Zkusit znovu
              </button>
            )}
          {message.isUser && !isTesting && (
            <>
              <button
                className="helperText"
                onClick={() => {
                  onCorrectionClick(message);
                  console.log(message);
                }}
              >
                Kontrola
              </button>
              <button
                className="helperText"
                disabled={isLoadingReform}
                onClick={() => {
                  onReformClick(message, index);
                  console.log(message);
                }}
              >
                Reformulovat
              </button>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
