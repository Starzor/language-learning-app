import ChatContainer from "./Components/Chat/ChatContainer";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import TranslationPanel from "./Components/TranslationPanel/TranslationPanel";
import { Message, WordPair } from "./models/Message";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./styles/Modal.scss";
import "./styles/App.scss";

const App = () => {
  const [translationMessage, setTranslationMessage] = useState<Message>();
  const [translationOrVocab, setTranslationOrVocab] = useState<string>("");
  const [controlOrReform, setControlOrReform] = useState<string>("");
  const [controlMessage, setControlMessage] = useState<Message>();
  const [newWords, setNewWords] = useState<Array<WordPair>>([]);
  const [isLoadingReform, setIsLoadingReform] = useState<boolean>(false);

  const resetMessages = () => {
    setTranslationMessage(undefined);
    setTranslationOrVocab("");
    setControlMessage(undefined);
  };

  const handleTranslationClick = (message: Message) => {
    setTranslationOrVocab("translation");
    setTranslationMessage(message);
  };

  const handleVocabularyClick = (message: Message) => {
    setTranslationOrVocab("vocabulary");
    setTranslationMessage(message);
  };

  const handleControlClick = (message: Message) => {
    setControlOrReform("control");
    setControlMessage(message);
  };

  const handleReformClick = (message: Message) => {
    setControlOrReform("reform");
    setControlMessage(message);
    console.log(message);
  };

  const handleNewWordToggle = (wordPair: WordPair) => {
    if (newWords.map((entry) => entry.word).includes(wordPair.word)) {
      setNewWords(newWords.filter((entry) => entry.word != wordPair.word));
      return;
    }
    setNewWords([...newWords, wordPair]);
  };

  useEffect(() => {
    Modal.setAppElement(".App");
  }, []);

  return (
    <div className="App">
      <ControlPanel
        controlMessage={controlMessage}
        controlOrReform={controlOrReform}
        isLoadingReform={isLoadingReform}
      />
      <ChatContainer
        onTranslateClick={handleTranslationClick}
        onVocabularyClick={handleVocabularyClick}
        onCorrectionClick={handleControlClick}
        onReformClick={handleReformClick}
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
