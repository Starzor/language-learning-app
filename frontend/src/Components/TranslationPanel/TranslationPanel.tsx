import React from "react";
import { Message } from "../../models/Message";
import TranslationView from "./TranslationView";
import VocabularyView from "./VocabularyView";
import "../../styles/SidePanel.scss";

interface TranslationPanelProps {
  translationMessage?: Message;
  translationOrVocab?: string;  
}

const TranslationPanel: React.FC<TranslationPanelProps> = ({
  translationMessage,
  translationOrVocab
}) => {
  return (
    <div className="sidePanel">
      <div className="tabList">
        <div
          className={`tabButton headingText ${
            translationOrVocab == "translation" ? "active" : ""
          }`}
        >
          Překlad
        </div>
        <div
          className={`tabButton headingText ${
            translationOrVocab == "vocabulary" ? "active" : ""
          }`}
        >
          Slovník
        </div>
      </div>
      {translationMessage &&
        ((translationOrVocab == "translation" && (
          <TranslationView translationMessage={translationMessage} />
        )) ||
          (translationOrVocab == "vocabulary" && (
            <VocabularyView translationMessage={translationMessage} />
          )))}
    </div>
  );
};

export default TranslationPanel;
