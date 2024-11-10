import React from "react";
import { Message } from "../../models/Message";
import "../../styles/TranslationPanel.scss";

interface TranslationViewProps {
  translationMessage: Message;
}

const TranslationView: React.FC<TranslationViewProps> = ({
  translationMessage,
}) => {
  return (
    <div>
      <p>Původní text v {translationMessage.language}:</p>
      <div>
        <p>{translationMessage?.text}</p>
      </div>
      <p>Přeložený text v Češtině:</p>
      <div>
        <p>{translationMessage?.translation}</p>
      </div>
    </div>
  );
};

export default TranslationView;
