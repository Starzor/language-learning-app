import React from "react";
import { Message } from "../../models/Message";
import "../../styles/SidePanel.scss";
import Paragraph from "../Reusable/Paragraph";
import Heading from "../Reusable/Heading";

interface TranslationViewProps {
  translationMessage: Message;
}

const TranslationView: React.FC<TranslationViewProps> = ({
  translationMessage,
}) => {
  return (
    <div className="sidePanelInnerContainer">
      <Heading>Původní text v {translationMessage.language}:</Heading>
      <div className="sidePanelTextContainer">
        <Paragraph>{translationMessage.text}</Paragraph>
      </div>
      <Heading>Přeložený text v Češtině:</Heading>
      <div className="sidePanelTextContainer">
        <Paragraph>{translationMessage.translation}</Paragraph>
      </div>
    </div>
  );
};

export default TranslationView;
