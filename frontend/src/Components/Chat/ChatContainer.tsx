import { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message } from "../../models/Message";
import { ReplyRequest } from "../../models/ReplyRequest";
import ChatLanguage from "./ChatLanguage";
import ChatDifficulty from "./ChatDifficulty";
import { getChatReply } from "../../api";
import ChatLoading from "./ChatLoading";
import "../../styles/Chat.scss";

interface ChatContainerProps {
  onTranslateClick?: any;
  onVocabularyClick?: any;
  onCorrectionClick?: any;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  onTranslateClick,
  onVocabularyClick,
  onCorrectionClick,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [language, setLanguage] = useState<string>("Angličtina");
  const [difficulty, setDifficulty] = useState<string>("A1");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccessfulReply = (response: Array<string>) => {
    const messageResponse = JSON.parse(response[0]);
    const correctionResponse = JSON.parse(response[1]);
    const newUserMessage = {
      text: newMessage,
      isUser: true,
      correction: correctionResponse.correction,
      incorrectText: correctionResponse.original,
    };
    const newSystemMessage = {
      text: messageResponse.response,
      isUser: false,
      vocabulary: messageResponse.words,
      translation: messageResponse.translation,
      language: language,
    };
    setMessages([...messages, newUserMessage, newSystemMessage]);
    onCorrectionClick(newUserMessage);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() == "") return;
    setMessages([...messages, { text: newMessage, isUser: true }]);
    setNewMessage("");
    setLoading(true);
    const request: ReplyRequest = {
      language: language,
      difficulty: difficulty,
      message: newMessage,
      history: messages
        .map((message) => {
          return message.isUser
            ? `System: ${message.text}`
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
      <ChatMessages
        messages={messages}
        onTranslateClick={onTranslateClick}
        onVocabularyClick={onVocabularyClick}
        onCorrectionClick={onCorrectionClick}
      />
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
