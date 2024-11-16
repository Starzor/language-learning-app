import React from "react";
import { Message } from "../../models/Message";
import "../../styles/SidePanel.scss";

interface VocabularyViewProps {
  translationMessage: Message;
}

const VocabularyView: React.FC<VocabularyViewProps> = ({
  translationMessage,
}) => {
  return (
    <div className="sidePanelInnerContainer">
      <p className="headingText">Slovník:</p>
      <div className="sidePanelTextContainer">
        {translationMessage.vocabulary?.map((pair, index) => (
          <p key={index} className="commonText">
            <span className="highlightedText">{pair.word}</span> -{" "}
            {pair.translated}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VocabularyView;
