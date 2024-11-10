import React from "react";
import { Message } from "../../models/Message";
import "../../styles/TranslationPanel.scss";

interface VocabularyViewProps {
  translationMessage: Message;
}

const VocabularyView: React.FC<VocabularyViewProps> = ({
  translationMessage,
}) => {
  return (
    <div>
      <p>Slovník:</p>
      <div>
        {translationMessage.vocabulary?.map((pair) => (
          <p>
            <span>{pair.word}</span>
            {pair.translated}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VocabularyView;
