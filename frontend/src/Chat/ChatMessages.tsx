import { useEffect, useRef } from "react";
import Message from "../models/Message";
import "../styles/Chat.scss";
import ReactMarkdown from "react-markdown";

const ChatMessages = (props: any) => {
  const { messages, explainAnswer, toggleShowMessage } = props;
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
              {!message.isUser && !message.isExplanation && (
                <>
                  {!message.isExplained && (
                    <button onClick={() => explainAnswer(index)}>
                      Explain
                    </button>
                  )}

                  {message.isExplained && !messages[index + 1].isHidden && (
                    <button onClick={() => toggleShowMessage(index + 1)}>
                      Hide Explanation
                    </button>
                  )}
                  {message.isExplained && messages[index + 1].isHidden && (
                    <button onClick={() => toggleShowMessage(index + 1)}>
                      Show Explanation
                    </button>
                  )}
                </>
              )}
            </div>
          )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
