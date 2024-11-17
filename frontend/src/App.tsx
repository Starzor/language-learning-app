import ChatContainer from "./Components/Chat/ChatContainer";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import TranslationPanel from "./Components/TranslationPanel/TranslationPanel";
import { Message } from "./models/Message";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./styles/Modal.scss";
import "./styles/App.scss";

const App = () => {
  const [translationMessage, setTranslationMessage] = useState<Message>();
  const [translationOrVocab, setTranslationOrVocab] = useState<string>("");
  const [controlMessage, setControlMessage] = useState<Message>();

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

  useEffect(() => {
    Modal.setAppElement(".App");
  }, []);

  return (
    <div className="App">
      <ControlPanel controlMessage={controlMessage} />
      <ChatContainer
        onTranslateClick={handleTranslationClick}
        onVocabularyClick={handleVocabularyClick}
        onCorrectionClick={setControlMessage}
        onClickReset={resetMessages}
      />
      <TranslationPanel
        translationMessage={translationMessage}
        translationOrVocab={translationOrVocab}
      />
    </div>
  );
};

export default App;
