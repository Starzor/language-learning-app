import ChatContainer from "./Components/Chat/ChatContainer";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import TranslationPanel from "./Components/TranslationPanel/TranslationPanel";
import { Message, WordPair } from "./models/Message";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./styles/App.scss";
import ConfirmationModal from "./Components/ConfirmationModal/ConfirmationModal";
import TutorialModal from "./Components/TutorialModal/TutorialModal";

const App = () => {
  const [translationMessage, setTranslationMessage] = useState<Message>();
  const [translationOrVocab, setTranslationOrVocab] = useState<string>("");
  const [controlOrReform, setControlOrReform] = useState<string>("");
  const [controlMessage, setControlMessage] = useState<Message>();
  const [newWords, setNewWords] = useState<Array<WordPair>>([]);
  const [isLoadingReform, setIsLoadingReform] = useState<boolean>(false);
  const [isPromptingTutorial, setIsPromptingTutorial] = useState<boolean>(true);
  const [isViewingTutorial, setIsViewingTutorial] = useState<boolean>(false);

  const resetMessages = () => {
    setTranslationMessage(undefined);
    setTranslationOrVocab("");
    setControlMessage(undefined);
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

  const handleNewWordToggle = (wordPair: WordPair) => {
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

  useEffect(() => {
    Modal.setAppElement(".App");
  }, []);

  return (
    <div className="App">
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
        isLoadingReform={isLoadingReform}
      />
      <ChatContainer
        onTranslateClick={handleTranslationClick}
        onVocabularyClick={handleVocabularyClick}
        onCorrectionClick={handleControlClick}
        onReformClick={setControlOrReform}
        setReformMessage={setControlMessage}
        onClickReset={resetMessages}
        setIsLoadingReform={setIsLoadingReform}
        newWords={newWords}
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
