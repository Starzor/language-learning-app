import ChatContainer from "./Components/Chat/ChatContainer";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import TranslationPanel from "./Components/TranslationPanel/TranslationPanel";
import { Message, WordTrio } from "./models/Message";
import { useEffect, useState } from "react";
import "./styles/App.scss";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./Components/ConfirmationModal/ConfirmationModal";
import TutorialModal from "./Components/TutorialModal/TutorialModal";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { getReformedText } from "./api";
import { ReformTextRequest } from "./models/ReformTextRequest";

const App = () => {
  const [translationMessage, setTranslationMessage] = useState<Message>();
  const [translationOrVocab, setTranslationOrVocab] = useState<
    "Překlad" | "Slovník" | ""
  >("");
  const [controlOrReform, setControlOrReform] = useState<
    "Kontrola" | "Reformulace" | ""
  >("");
  const [controlMessage, setControlMessage] = useState<Message>();
  const [newWords, setNewWords] = useState<Array<WordTrio>>([]);
  const [isPromptingTutorial, setIsPromptingTutorial] = useState<boolean>(true);
  const [isViewingTutorial, setIsViewingTutorial] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [isLoadingReform, setIsLoadingReform] = useState<boolean>(false);
  const [saveWords, setSaveWords] = useState<boolean>(false);

  const resetMessages = () => {
    setTranslationMessage(undefined);
    setTranslationOrVocab("");
    setControlOrReform("");
    setControlMessage(undefined);
    if(!saveWords) setNewWords([]);
  };

  const handleTranslationClick = (message?: Message) => {
    setTranslationOrVocab("Překlad");
    setTranslationMessage(message);
  };

  const handleVocabularyClick = (message?: Message) => {
    setTranslationOrVocab("Slovník");
    setTranslationMessage(message);
  };

  const handleControlClick = (message?: Message) => {
    setControlOrReform("Kontrola");
    setControlMessage(message);
  };

  const handleNewWordToggle = (wordPair: WordTrio) => {
    if (newWords.map((entry) => entry.word).includes(wordPair.word)) {
      setNewWords(newWords.filter((entry) => entry.word != wordPair.word));
      return;
    }
    setNewWords([...newWords, wordPair]);
  };

  const handleRejectTutorialPrompt = () => {
    setIsViewingTutorial(false);
    setIsPromptingTutorial(false);
    localStorage.setItem("viewTutorial", "false");
  };

  const handleAcceptTutorialPrompt = () => {
    setIsViewingTutorial(true);
    setIsPromptingTutorial(false);
  };

  const notifyError = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message);

  const handleGetReformedText = (message?: Message, id?: number) => {
    setControlOrReform("Reformulace");
    setControlMessage(undefined);
    if(!message) {
      return;
    } else if (!message.reformed) {
      setIsLoadingReform(true);
      const reformRequest: ReformTextRequest = {
        text: message.text,
      };
      getReformedText(reformRequest)
        .then((response) => {
          const reformedSentence = JSON.parse(response).reformed_sentence;
          const newMessage: Message = {
            ...message,
            reformed: reformedSentence,
          };
          setMessages((prevMessages) =>
            prevMessages.map((item, index) =>
              index === id ? newMessage : item
            )
          );
          setControlMessage(newMessage);
        })
        .catch((error) => {
          notifyError(`Error getting reformed sentence: ${error}`);
          setControlOrReform("");
        })
        .then(() => setIsLoadingReform(false));
    } else {
      setControlMessage(message);
    }
  };

  useEffect(() => {
    const retrievedWords: string | null = localStorage.getItem("newWords");
    const parsedWords: Array<WordTrio> = retrievedWords ? JSON.parse(retrievedWords) : null;
    if(parsedWords && parsedWords.length > 0) {
      setNewWords(parsedWords);
      setSaveWords(true);
    }
    const viewTutorial: string | null = localStorage.getItem("viewTutorial");
    if(viewTutorial == "false") {
      setIsPromptingTutorial(false);
    }
  }, [])

  useEffect(() => {
    if (saveWords) {
      localStorage.setItem("newWords", JSON.stringify(newWords))
      return;
    }
    localStorage.setItem("newWords", JSON.stringify([]))
  }, [newWords])

  return (
    <div className="App">
      <ToastContainer
        className="commonText"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <ConfirmationModal
        labelText="Chcete si projít tutoriál?"
        isOpen={isPromptingTutorial}
        onClickClose={handleRejectTutorialPrompt}
        onClickConfirm={handleAcceptTutorialPrompt}
      />
      <TutorialModal
        isOpen={isViewingTutorial}
        setIsOpen={setIsViewingTutorial}
      />
      <ControlPanel
        onControlTabClick={handleControlClick}
        onReformulateTabClick={handleGetReformedText}
        controlMessage={controlMessage}
        controlOrReform={controlOrReform}
      />
      <ChatContainer
        messages={messages}
        setMessages={setMessages}
        handleGetReformedText={handleGetReformedText}
        onTranslateClick={handleTranslationClick}
        onVocabularyClick={handleVocabularyClick}
        onCorrectionClick={handleControlClick}
        onClickReset={resetMessages}
        newWords={newWords}
        notifyError={notifyError}
        notifySuccess={notifySuccess}
        isLoadingReform={isLoadingReform}
      />
      <TranslationPanel
        handleNewWordToggle={handleNewWordToggle}
        translationMessage={translationMessage}
        translationOrVocab={translationOrVocab}
        onVocabularyTabClick={handleVocabularyClick}
        onTranslationTabClick={handleTranslationClick}
        newWords={newWords}
        saveWords={saveWords}
        setSaveWords={setSaveWords}
      />
    </div>
  );
};

export default App;
