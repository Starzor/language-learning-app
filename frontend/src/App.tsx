import ChatContainer from "./Components/Chat/ChatContainer";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import "./styles/App.scss";
import TranslationPanel from "./Components/TranslationPanel/TranslationPanel";
import { Message } from "./models/Message";
import { useState } from "react";

const App = () => {
  const [translationMessage, setTranslationMessage] = useState<Message>();
  const [translationOrVocab, setTranslationOrVocab] = useState<string>("");

  const handleTranslationClick = (message: Message) => {
    setTranslationOrVocab("translation");
    setTranslationMessage(message);
  };

  const handleVocabularyClick = (message: Message) => {
    setTranslationOrVocab("vocabulary");
    setTranslationMessage(message);
  };

  return (
    <div className="App">
      <ControlPanel />
      <ChatContainer
        onTranslateClick={handleTranslationClick}
        onVocabularyClick={handleVocabularyClick}
      />
      <TranslationPanel
        translationMessage={translationMessage}
        translationOrVocab={translationOrVocab}
      />
    </div>
  );
};

export default App;
