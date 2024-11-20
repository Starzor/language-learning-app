import React from "react";
import { Message, WordPair } from "../../models/Message";
import "../../styles/SidePanel.scss";
import CheckboxButton from "../Reusable/CheckboxButton";
import Paragraph from "../Reusable/Paragraph";
import Heading from "../Reusable/Heading";

interface VocabularyViewProps {
  translationMessage: Message;
  handleNewWordToggle: (wordPair: WordPair) => void;
  newWords: Array<WordPair>;
}

const VocabularyView: React.FC<VocabularyViewProps> = ({
  translationMessage,
  handleNewWordToggle,
  newWords,
}) => {
  const hello = "hello";
  return (
    <div className="sidePanelInnerContainer">
      <Heading margin="None">Slovník:</Heading>
      <Paragraph margin="None" textSize="Helper" textColor="Secondary">
        Stisknutím checkboxu vedle slova jej přidáte do Nových slov (slova, co
        neznáte, systém se bude snažit používat je častěji)
      </Paragraph>
      <div className="sidePanelTextContainer">
        {translationMessage.vocabulary?.map((pair, index) => (
          <div key={index} className="vocabularyRow">
            <CheckboxButton
              active={newWords
                .map((wordPair) => wordPair.word)
                .includes(pair.word)}
              onClick={() => handleNewWordToggle(pair)}
            />
            <Paragraph margin="None">
              <span className="highlightedText">{pair.word}</span> -{" "}
              {pair.translated}
            </Paragraph>
          </div>
        ))}
      </div>
      <Heading margin="None">Nová slova:</Heading>
      {newWords.length > 0 && (
        <div className="sidePanelTextContainer">
          {newWords.map((pair, index) => (
            <div key={index} className="vocabularyRow">
              <CheckboxButton
                active={newWords
                  .map((wordPair) => wordPair.word)
                  .includes(pair.word)}
                onClick={() => handleNewWordToggle(pair)}
              />
              <Paragraph margin="None">
                <span className="highlightedText">{pair.word}</span> -{" "}
                {pair.translated}
              </Paragraph>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VocabularyView;
