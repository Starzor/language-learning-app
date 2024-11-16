import { useEffect, useRef, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message } from "../../models/Message";
import { ReplyRequest } from "../../models/ReplyRequest";
import ChatLanguage from "./ChatLanguage";
import ChatDifficulty from "./ChatDifficulty";
import { getChatReply } from "../../api";
import ChatLoading from "./ChatLoading";
import "../../styles/Chat.scss";
import { TestData } from "../../models/TestData";
import { LANGUAGE_MAP } from "../../constants";

interface ChatContainerProps {
  onTranslateClick?: any;
  onVocabularyClick?: any;
  onCorrectionClick?: any;
  onClickReset?: any;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  onTranslateClick,
  onVocabularyClick,
  onCorrectionClick,
  onClickReset,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [language, setLanguage] = useState<string>("Angličtina");
  const [difficulty, setDifficulty] = useState<string>("A1");
  const [loading, setLoading] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const messagesRef = useRef(messages);

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
    setMessages([...messagesRef.current, { text: newMessage, isUser: true }]);
    setNewMessage("");
    // If is testing we don't need to run the next part of code which handles HTTP request to API
    if (isTesting) return;
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

  const resetChat = () => {
    setMessages([]);
    onClickReset();
  };

  const handleLanguageTest = async () => {
    resetChat();
    setIsTesting(true);
    const testData: TestData = await import(
      `../../tests/${LANGUAGE_MAP[language]}.json`
    );
    for (let question of testData.test) {
      setMessages([
        ...messagesRef.current,
        {
          text: question.question,
          isUser: false,
        },
      ]);

      await waitForUserResponse();
    }

    const answers: Array<string> = messagesRef.current
      .filter((message) => message.isUser)
      .map((message) => message.text);

    console.log(answers);
    setIsTesting(false);
    resetChat();
  };

  const waitForUserResponse = () => {
    return new Promise<void>((resolve) => {
      const initialLength = messagesRef.current.filter(
        (message) => message.isUser
      ).length;
      const interval = setInterval(() => {
        if (
          messagesRef.current.filter((message) => message.isUser).length >
          initialLength
        ) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  return (
    <div className="chatContainer">
      <div className="chatSettings">
        {!isTesting && (
          <>
            <div className="chatSettingsLeft">
              <button className="resetChat" onClick={resetChat}>
                <img src={require("../../images/restart.png")} />
              </button>
            </div>
            <div className="chatSettingsRight">
              <button
                className="testButton headingText"
                onClick={handleLanguageTest}
              >
                Test jazyku
              </button>
              <ChatDifficulty
                difficulty={difficulty}
                setDifficulty={setDifficulty}
              />
              <ChatLanguage language={language} setLanguage={setLanguage} />
            </div>
          </>
        )}
      </div>
      <ChatMessages
        messages={messages}
        isTesting={isTesting}
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
