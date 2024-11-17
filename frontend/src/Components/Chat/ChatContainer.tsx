import { SetStateAction, useEffect, useRef, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message } from "../../models/Message";
import { ReplyRequest } from "../../models/ReplyRequest";
import ChatLanguage from "./ChatLanguage";
import ChatDifficulty from "./ChatDifficulty";
import { getChatReply, getTestResults } from "../../api";
import ChatLoading from "./ChatLoading";
import "../../styles/Chat.scss";
import { TestData } from "../../models/TestData";
import { LANGUAGE_MAP } from "../../constants";
import { TestEvaluationRequest } from "../../models/TestEvaluationRequest";
import Modal from "react-modal";

interface ChatContainerProps {
  onTranslateClick?: any;
  onVocabularyClick?: any;
  onCorrectionClick?: any;
  onClickReset?: any;
  isTesting: boolean;
  setIsTesting: React.Dispatch<SetStateAction<boolean>>;
  setIsTestModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  onTranslateClick,
  onVocabularyClick,
  onCorrectionClick,
  onClickReset,
  isTesting,
  setIsTesting,
  setIsTestModalOpen
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [language, setLanguage] = useState<string>("Angličtina");
  const [difficulty, setDifficulty] = useState<string>("A1");
  const [loading, setLoading] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
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
    setIsResetModalOpen(false);
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

    const testEvaluationRequest: TestEvaluationRequest = {
      answers: answers,
      test: testData,
    };
    getTestResults(testEvaluationRequest).then(value => setDifficulty(value));
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

  useEffect(() => {
    if (isTesting) {
      handleLanguageTest();
    }
  }, [isTesting])

  return (
    <div className="chatContainer">
      <Modal
        isOpen={isResetModalOpen}
        className="reactModal"
        overlayClassName="reactModalOverlay"
      >
        <p className="commonText centerText">
          Opravdu chcete resetovat konverzaci?
        </p>
        <div>
          <button
            className="commonText"
            onClick={() => setIsResetModalOpen(false)}
          >
            Ne
          </button>
          <button
            className="commonText lightPurpleText"
            onClick={resetChat}
          >
            Ano
          </button>
        </div>
      </Modal>
      <div className="chatSettings">
        {!isTesting && (
          <>
            <div className="chatSettingsLeft">
              <button className="resetChat" onClick={() => setIsResetModalOpen(true)}>
                <img src={require("../../images/restart.png")} />
              </button>
            </div>
            <div className="chatSettingsRight">
              <button
                className="testButton headingText"
                onClick={() => setIsTestModalOpen(true)}
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
