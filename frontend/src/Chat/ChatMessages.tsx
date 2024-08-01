import { useEffect, useRef } from "react";
import Message from "../models/Message";
import "../styles/Chat.scss";
import ReactMarkdown from "react-markdown";

const ChatMessages = (props: any) => {
  const { messages, explainAnswer } = props;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
          <ReactMarkdown>{message.text}</ReactMarkdown>
          {!message.isUser && !message.isExplanation && <button onClick={explainAnswer}>Explain</button>}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
