import { useEffect, useRef } from "react";
import { Message } from "../../models/Message";
import ReactMarkdown from "react-markdown";
import "../../styles/Chat.scss";

interface ChatMessagesProps {
  messages: Array<Message>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({messages}) => {

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
      {messages.map(
        (message: Message, index: number) =>
          !message.isHidden && (
            <div
              key={index}
              className={message.isUser ? "user message" : "bot message"}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
