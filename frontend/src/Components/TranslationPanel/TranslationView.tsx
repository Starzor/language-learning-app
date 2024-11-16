import React from "react";
import { Message } from "../../models/Message";
import "../../styles/SidePanel.scss";

interface TranslationViewProps {
  translationMessage: Message;
}

const TranslationView: React.FC<TranslationViewProps> = ({
  translationMessage,
}) => {
  return (
    <div className="sidePanelInnerContainer">
      <p className="headingText">Původní text v {translationMessage.language}:</p>
      <div className="sidePanelTextContainer">
        <p className="commonText">{translationMessage?.text}</p>
      </div>
      <p className="headingText">Přeložený text v Češtině:</p>
      <div className="sidePanelTextContainer">
        <p className="commonText">{translationMessage?.translation}</p>
      </div>
    </div>
  );
};

export default TranslationView;
