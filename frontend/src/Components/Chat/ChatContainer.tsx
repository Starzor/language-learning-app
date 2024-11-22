import { SetStateAction, useEffect, useRef, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message, WordPair } from "../../models/Message";
import { ReplyRequest } from "../../models/ReplyRequest";
import {
  getChatReply,
  getReformedText,
  getTestResults,
  getTopicConversation,
} from "../../api";
import "../../styles/Chat.scss";
import { TestData } from "../../models/TestData";
import { LANGUAGE_MAP, TOPICS } from "../../constants";
import { TestEvaluationRequest } from "../../models/TestEvaluationRequest";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ChatSettings from "./ChatSettings";
import ChatWelcome from "./ChatWelcome";
import { TopicConversationRequest } from "../../models/TopicConversationRequest";
import { ReformTextRequest } from "../../models/ReformTextRequest";

interface ChatContainerProps {
  onTranslateClick?: any;
  onVocabularyClick?: any;
  onCorrectionClick?: any;
  onReformClick?: any;
  setReformMessage: React.Dispatch<SetStateAction<Message | undefined>>;
  onClickReset?: any;
  newWords?: Array<WordPair>;
  setIsLoadingReform: React.Dispatch<SetStateAction<boolean>>;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  onTranslateClick,
  onVocabularyClick,
  onCorrectionClick,
  onReformClick,
  onClickReset,
  newWords,
  setReformMessage,
  setIsLoadingReform,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
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
    const newUserMessage = {
      ...messagesRef.current[messagesRef.current.length - 1],
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
    if (newMessage.trim() == "") {
      return;
    }
    setMessages([...messagesRef.current, { text: newMessage, isUser: true }]);
    setNewMessage("");
    // If is testing we don't need to run the next part of code which handles HTTP request to API
    if (isTesting) {
      return;
    }
    setLoading(true);
    const request: ReplyRequest = {
      language: language,
      difficulty: difficulty,
      message: newMessage,
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
    getChatReply(request)
      .then((response) => handleSuccessfulReply(response))
      .then(() => setLoading(false));
  };

  const handleLanguageTest = async () => {
    onReformClick("");
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
    getTestResults(testEvaluationRequest).then((value) => setDifficulty(value));
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
    onReformClick("");
    onClickReset();
    setIsResetModalOpen(false);
  };

  const handleClickTopic = (topic: string) => {
    setTopic(topic);
    setLoading(true);
    const request: TopicConversationRequest = {
      language: language,
      difficulty: difficulty,
      topic: topic,
    };

    getTopicConversation(request)
      .then((data) => {
        const parsedData = JSON.parse(data);
        setMessages([
          ...messagesRef.current,
          {
            text: parsedData.response,
            isUser: false,
            vocabulary: parsedData.words,
            translation: parsedData.translation,
            language: language,
          },
        ]);
      })
      .then(() => setLoading(false));
  };

  const handleGetReformedText = (message: Message, id: number) => {
    onReformClick("Reformulace");
    setReformMessage(undefined);
    setIsLoadingReform(true);
    if (!message.reformed) {
      const reformRequest: ReformTextRequest = {
        text: message.text,
      };
      getReformedText(reformRequest).then((response) => {
        const reformedSentence = JSON.parse(response).reformed_sentence;
        const newMessage: Message = {
          ...message,
          reformed: reformedSentence,
        };
        setMessages((prevMessages) =>
          prevMessages.map((item, index) => (index === id ? newMessage : item))
        );
        setReformMessage(newMessage);
      });
    } else {
      setReformMessage(message);
    }
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
        language={language}
        isTesting={isTesting}
        difficulty={difficulty}
        onLanguageChange={setLanguage}
        onDifficultyChange={setDifficulty}
        onTestClick={() => setIsTestModalOpen(true)}
        onResetClick={() => setIsResetModalOpen(true)}
      />
      {messages.length == 0 && !loading && (
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
