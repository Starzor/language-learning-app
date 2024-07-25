import { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Message from "../models/Message";
import ReplyRequest from "../models/ReplyRequest";
import "../styles/Chat.scss";
import ChatLanguage from "./ChatLanguage";
import ChatDifficulty from "./ChatDifficulty";
import { getChatReply, getReplyExplanation } from "../api";
import ExplanationRequest from "../models/ExplanationRequest";

const ChatContainer = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [language, setLanguage] = useState<string>("Angličtina");
  const [difficulty, setDifficulty] = useState<string>("A1");

  const handleSuccessfulReply = (response: string, isExplanation: boolean) => {
    setMessages([
      ...messages,
      { text: newMessage, isUser: true },
      { text: response, isUser: false, isExplanation: isExplanation },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() == "") return;
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
      .then((response) => handleSuccessfulReply(response, false))
      .then(() => setNewMessage(""));
  };

  const explainAnswer = () => {
    const request: ExplanationRequest = {
      base_language: "Czech",
      language: language,
      message: messages[messages.length - 1].text,
    };
    getReplyExplanation(request).then((response) =>
      handleSuccessfulReply(response, true)
    );
  };

  return (
    <div className="chatContainer">
      <div className="chatSettings">
        <ChatDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />
        <ChatLanguage language={language} setLanguage={setLanguage} />
      </div>
      {messages.length == 0 && (
        <div className="chatWelcome">
          Vítejte v chatovací aplikaci na výuku jazyků. V pravém horním rohu si
          vyberte obtížnost a jazyk a můžete začít.
        </div>
      )}
      {messages.length != 0 && (
        <ChatMessages messages={messages} explainAnswer={explainAnswer} />
      )}
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatContainer;
