import React, { SetStateAction, useEffect, useState } from "react";
import { Message, WordTrio } from "../../models/Message";
import TranslationView from "./TranslationView";
import VocabularyView from "./VocabularyView";
import "../../styles/SidePanel.scss";
import TabList, { Tab } from "../Reusable/TabList";

interface TranslationPanelProps {
  translationMessage?: Message;
  translationOrVocab?: string;
  newWords: Array<WordTrio>;
  saveWords: boolean;
  setSaveWords: React.Dispatch<SetStateAction<boolean>>;
  handleNewWordToggle: (wordPair: WordTrio) => void;
  onVocabularyTabClick: (message?: Message) => void;
  onTranslationTabClick: (message?: Message) => void;
}

const TranslationPanel: React.FC<TranslationPanelProps> = ({
  translationMessage,
  translationOrVocab,
  newWords,
  saveWords,
  setSaveWords,
  handleNewWordToggle,
  onVocabularyTabClick,
  onTranslationTabClick,
}) => {
  const [activeId, setActiveId] = useState<number>();
  const tabs: Array<Tab> = [
    {
      name: "Překlad",
      onClick: () => onTranslationTabClick(translationMessage),
      disabled: translationMessage ? false : true,
    },
    {
      name: "Slovník",
      onClick: () => onVocabularyTabClick(translationMessage),
      disabled: translationMessage ? false : true,
    },
  ];

  useEffect(() => {
    setActiveId(tabs.findIndex((tab) => tab.name == translationOrVocab));
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
              saveWords={saveWords}
              setSaveWords={setSaveWords}
            />
          )))}
    </div>
  );
};

export default TranslationPanel;
