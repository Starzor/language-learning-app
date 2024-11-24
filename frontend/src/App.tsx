import ChatContainer from "./Components/Chat/ChatContainer";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import TranslationPanel from "./Components/TranslationPanel/TranslationPanel";
import { Message, WordTrio } from "./models/Message";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./styles/App.scss";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./Components/ConfirmationModal/ConfirmationModal";
import TutorialModal from "./Components/TutorialModal/TutorialModal";
import { Bounce, toast, ToastContainer } from "react-toastify";

const App = () => {
  const [translationMessage, setTranslationMessage] = useState<Message>();
  const [translationOrVocab, setTranslationOrVocab] = useState<"Překlad" | "Slovník" | "">("");
  const [controlOrReform, setControlOrReform] = useState<"Kontrola" | "Reformulace" | "">("");
  const [controlMessage, setControlMessage] = useState<Message>();
  const [newWords, setNewWords] = useState<Array<WordTrio>>([]);
  const [isPromptingTutorial, setIsPromptingTutorial] = useState<boolean>(true);
  const [isViewingTutorial, setIsViewingTutorial] = useState<boolean>(false);

  const resetMessages = () => {
    setTranslationMessage(undefined);
    setTranslationOrVocab("");
    setControlOrReform("");
    setControlMessage(undefined);
    setNewWords([]);
  };

  const handleTranslationClick = (message: Message) => {
    setTranslationOrVocab("Překlad");
    setTranslationMessage(message);
  };

  const handleVocabularyClick = (message: Message) => {
    setTranslationOrVocab("Slovník");
    setTranslationMessage(message);
  };

  const handleControlClick = (message: Message) => {
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
  };

  const handleAcceptTutorialPrompt = () => {
    setIsViewingTutorial(true);
    setIsPromptingTutorial(false);
  };

  const notifyError = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message);

  useEffect(() => {
    Modal.setAppElement(".App");
  }, []);

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
        controlMessage={controlMessage}
        controlOrReform={controlOrReform}
      />
      <ChatContainer
        onTranslateClick={handleTranslationClick}
        onVocabularyClick={handleVocabularyClick}
        onCorrectionClick={handleControlClick}
        setControlOrReform={setControlOrReform}
        setReformMessage={setControlMessage}
        onClickReset={resetMessages}
        newWords={newWords}
        notifyError={notifyError}
        notifySuccess={notifySuccess}
      />
      <TranslationPanel
        handleNewWordToggle={handleNewWordToggle}
        translationMessage={translationMessage}
        translationOrVocab={translationOrVocab}
        newWords={newWords}
      />
    </div>
  );
};

export default App;
