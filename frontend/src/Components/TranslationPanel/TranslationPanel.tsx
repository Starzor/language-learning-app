import React, { useEffect, useState } from "react";
import { Message, WordTrio } from "../../models/Message";
import TranslationView from "./TranslationView";
import VocabularyView from "./VocabularyView";
import "../../styles/SidePanel.scss";
import TabList from "../Reusable/TabList";

interface TranslationPanelProps {
  translationMessage?: Message;
  translationOrVocab?: string;
  handleNewWordToggle: (wordPair: WordTrio) => void;
  newWords: Array<WordTrio>;
}

const TranslationPanel: React.FC<TranslationPanelProps> = ({
  translationMessage,
  translationOrVocab,
  handleNewWordToggle,
  newWords,
}) => {
  const [activeId, setActiveId] = useState<number>();
  const tabs: Array<string> = ["Překlad", "Slovník"];

  useEffect(() => {
    setActiveId(tabs.findIndex((tab) => tab == translationOrVocab));
  }, [translationOrVocab]);

  return (
    <div className="sidePanel">
      <TabList tabs={tabs} activeId={activeId} />
      {translationMessage &&
        ((translationOrVocab == "Překlad" && (
          <TranslationView translationMessage={translationMessage} />
        )) ||
          (translationOrVocab == "Slovník" && (
            <VocabularyView
              translationMessage={translationMessage}
              handleNewWordToggle={handleNewWordToggle}
              newWords={newWords}
            />
          )))}
    </div>
  );
};

export default TranslationPanel;
