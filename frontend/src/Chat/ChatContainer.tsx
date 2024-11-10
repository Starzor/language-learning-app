import { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message } from "../models/Message";
import { ReplyRequest } from "../models/ReplyRequest";
import "../styles/Chat.scss";
import ChatLanguage from "./ChatLanguage";
import ChatDifficulty from "./ChatDifficulty";
import { getChatReply } from "../api";
import ChatLoading from "./ChatLoading";

const ChatContainer = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [language, setLanguage] = useState<string>("Angličtina");
  const [difficulty, setDifficulty] = useState<string>("A1");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccessfulReply = (response: string) => {
    const gpt_response = JSON.parse(response);
    setMessages([
      ...messages,
      { text: newMessage, isUser: true },
      { text: gpt_response.response, isUser: false, translation: gpt_response.translation },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() == "") return;
    setMessages([
      ...messages,
      { text: newMessage, isUser: true },
    ]);
    setNewMessage("");
    setLoading(true);
    const request: ReplyRequest = {
      language: language,
      difficulty: difficulty,
      message: newMessage,
      history: messages
        .map((message) => {
          if (message.isExplanation) return "";
          return message.isUser
            ? `Bot: ${message.text}`
            : `User: ${message.text}`;
        })
        .join(),
    };
    getChatReply(request)
      .then((response) => handleSuccessfulReply(response))
      .then(() => setLoading(false));
  };

  return (
    <div className="chatContainer">
      <div className="chatSettings">
        <ChatDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />
        <ChatLanguage language={language} setLanguage={setLanguage} />
      </div>
        <ChatMessages messages={messages} />
      {loading && <ChatLoading />}
      {!loading && (
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ChatContainer;
