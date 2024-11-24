import { SetStateAction, useEffect, useRef, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message, WordTrio } from "../../models/Message";
import { ReplyRequest } from "../../models/ReplyRequest";
import { getChatReply, getTestResults, getTopicConversation } from "../../api";
import "../../styles/Chat.scss";
import { TestData } from "../../models/TestData";
import { LANGUAGE_MAP, TOPICS } from "../../constants";
import { TestEvaluationRequest } from "../../models/TestEvaluationRequest";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ChatSettings from "./ChatSettings";
import ChatWelcome from "./ChatWelcome";
import { TopicConversationRequest } from "../../models/TopicConversationRequest";

interface ChatContainerProps {
  newWords: Array<WordTrio>;
  messages: Array<Message>;
  isLoadingReform: boolean;
  handleGetReformedText: (message: Message, id: number) => void;
  setMessages: React.Dispatch<SetStateAction<Array<Message>>>;
  onTranslateClick: (message: Message) => void;
  onVocabularyClick: (message: Message) => void;
  onCorrectionClick: (message: Message) => void;
  onClickReset: () => void;
  notifyError: (arg0: string) => void;
  notifySuccess: (arg0: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  newWords,
  messages,
  isLoadingReform,
  handleGetReformedText,
  setMessages,
  onTranslateClick,
  onVocabularyClick,
  onCorrectionClick,
  onClickReset,
  notifyError,
  notifySuccess,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const [language, setLanguage] = useState<string>("Angličtina");
  const [difficulty, setDifficulty] = useState<string>("A1");
  const [topic, setTopic] = useState<string>("empty");
  const [loading, setLoading] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const messagesRef = useRef(messages);

  const handleSuccessfulReply = (response: Array<string>) => {
    const messageResponse = JSON.parse(response[0]);
    const correctionResponse = JSON.parse(response[1]);
    const newUserMessage: Message = {
      ...messagesRef.current[messagesRef.current.length - 1],
      correction: correctionResponse.correction,
      incorrectText: correctionResponse.original,
    };
    const newSystemMessage: Message = {
      id: messagesRef.current.length,
      text: messageResponse.response,
      isUser: false,
      vocabulary: messageResponse.words,
      translation: messageResponse.translation,
      language: language,
    };
    const newMessages = messagesRef.current.slice(0, -1);
    setMessages([...newMessages, newUserMessage, newSystemMessage]);
    onCorrectionClick(newUserMessage);
    onVocabularyClick(newSystemMessage);
  };

  const handleErrorReply = (error: any) => {
    notifyError(`Error getting response ${error}`);

    const errorSystemMessage: Message = {
      id: messagesRef.current.length,
      text: "Error receiving response",
      isUser: false,
      isError: true,
    };

    setMessages([...messagesRef.current, errorSystemMessage]);
  };

  const handleSendMessage = (isRetry: boolean = false) => {
    let messageValue = newMessage;
    if (isRetry) {
      messageValue = messagesRef.current[messagesRef.current.length - 2].text;
      setMessages([...messagesRef.current.slice(0, -1)]);
    }
    if (messageValue.trim() == "") {
      return;
    }
    if (!isRetry) {
      setMessages([
        ...messagesRef.current,
        { text: newMessage, isUser: true, id: messagesRef.current.length },
      ]);
    }
    // If is testing we don't need to run the next part of code which handles HTTP request to API
    setNewMessage("");
    if (isTesting) {
      return;
    }
    setLoading(true);
    const request: ReplyRequest = {
      language: LANGUAGE_MAP[language],
      difficulty: difficulty,
      message: messageValue,
      topic: topic,
      words: newWords
        ? `[${newWords.map((pair) => pair.word).join(",")}]`
        : "[]",
      history: messages
        .map((message) => {
          return message.isUser
            ? `System: ${message.text}`
            : `User: ${message.text}`;
        })
        .join(),
    };
    console.log(request);
    getChatReply(request)
      .then((response) => handleSuccessfulReply(response))
      .catch((error) => {
        console.log(error);
        handleErrorReply(error);
      })
      .then(() => setLoading(false));
  };

  const handleLanguageTest = async () => {
    setIsTestModalOpen(false);
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
          id: messagesRef.current.length
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
    getTestResults(testEvaluationRequest)
      .then((value) => {
        const response = JSON.parse(value);
        setDifficulty(response.CEFR);
        notifySuccess(`Language level evaluated to ${response.CEFR}`);
      })
      .catch((error) => {
        notifyError(`Error getting test results: ${error}`);
      });
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

  const resetChat = () => {
    setMessages([]);
    onClickReset();
    setIsResetModalOpen(false);
  };

  const handleClickTopic = (topic: string) => {
    setTopic(topic);
    setLoading(true);
    const request: TopicConversationRequest = {
      language: LANGUAGE_MAP[language],
      difficulty: difficulty,
      topic: topic,
    };

    getTopicConversation(request)
      .then((data) => {
        const parsedData = JSON.parse(data);
        const newSystemMessage: Message = {
          id: messagesRef.current.length,
          text: parsedData.response,
          isUser: false,
          vocabulary: parsedData.words,
          translation: parsedData.translation,
          language: language,
        };
        setMessages([...messagesRef.current, newSystemMessage]);
        onVocabularyClick(newSystemMessage);
        
      })
      .catch((error) => {
        notifyError(`Error getting topic: ${error}`);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  return (
    <div className="chatContainer">
      <ConfirmationModal
        labelText="Opravdu chcete konverzaci resetovat?"
        isOpen={isResetModalOpen}
        onClickConfirm={resetChat}
        onClickClose={() => setIsResetModalOpen(false)}
      />
      <ConfirmationModal
        labelText="Opravdu chcete provést test pro určení úrovně jazyku?"
        isOpen={isTestModalOpen}
        onClickConfirm={handleLanguageTest}
        onClickClose={() => setIsTestModalOpen(false)}
      />
      <ChatSettings
        loading={loading}
        language={language}
        isTesting={isTesting}
        difficulty={difficulty}
        onLanguageChange={setLanguage}
        onDifficultyChange={setDifficulty}
        onTestClick={() => setIsTestModalOpen(true)}
        onResetClick={() => setIsResetModalOpen(true)}
      />
      {!(messages.length > 0) && !loading && (
        <ChatWelcome topics={TOPICS} onTopicClick={handleClickTopic} />
      )}
      {(messages.length > 0 || loading) && (
        <ChatMessages
          messages={messages}
          isTesting={isTesting}
          onTranslateClick={onTranslateClick}
          onVocabularyClick={onVocabularyClick}
          onCorrectionClick={onCorrectionClick}
          onReformClick={handleGetReformedText}
          retryResponseRequest={handleSendMessage}
          isLoadingReform={isLoadingReform}
        />
      )}
      <ChatInput
        loading={loading}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatContainer;
