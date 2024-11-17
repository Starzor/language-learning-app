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
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);

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

  const handleStartTestClick = () => {
    setIsTestModalOpen(false);
    setIsTesting(true);
  };

  useEffect(() => {
    Modal.setAppElement(".App");
  }, []);

  return (
    <div className="App">
      <Modal
        isOpen={isTestModalOpen}
        className="reactModal"
        overlayClassName="reactModalOverlay"
      >
        <p className="commonText centerText">
          Opravdu chcete provést test pro určení úrovně jazyku?
        </p>
        <div>
          <button
            className="commonText"
            onClick={() => setIsTestModalOpen(false)}
          >
            Ne
          </button>
          <button
            className="commonText lightPurpleText"
            onClick={handleStartTestClick}
          >
            Ano
          </button>
        </div>
      </Modal>
      <ControlPanel controlMessage={controlMessage} />
      <ChatContainer
        onTranslateClick={handleTranslationClick}
        onVocabularyClick={handleVocabularyClick}
        onCorrectionClick={setControlMessage}
        onClickReset={resetMessages}
        isTesting={isTesting}
        setIsTesting={setIsTesting}
        setIsTestModalOpen={setIsTestModalOpen}
      />
      <TranslationPanel
        translationMessage={translationMessage}
        translationOrVocab={translationOrVocab}
      />
    </div>
  );
};

export default App;
