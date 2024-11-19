import React from "react";
import { Message, WordPair } from "../../models/Message";
import "../../styles/SidePanel.scss";

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
  return (
    <div className="sidePanelInnerContainer">
      <h2 className="headingText noMarginTopBottom">Slovník:</h2>
      <p className="helperText noMarginTopBottom">
        Stisknutím checkboxu vedle slova jej přidáte do Nových slov (slova, co
        neznáte, systém je bude používat častěji)
      </p>
      <div className="sidePanelTextContainer">
        {translationMessage.vocabulary?.map((pair, index) => (
          <div key={index} className="vocabularyRow">
            <button
              className={`checkboxButton ${
                newWords.map((wordPair) => wordPair.word).includes(pair.word) &&
                "activeCheckboxButton"
              } `}
              onClick={() => handleNewWordToggle(pair)}
            ></button>
            <p className="commonText noMarginTopBottom">
              <span className="highlightedText">{pair.word}</span> -{" "}
              {pair.translated}
            </p>
          </div>
        ))}
      </div>
      <h2 className="headingText noMarginTopBottom">Nová slova:</h2>
      {newWords.length > 0 && (
        <div className="sidePanelTextContainer">
          {newWords.map((pair, index) => (
            <div key={index} className="vocabularyRow">
              <button
                className={`checkboxButton ${
                  newWords
                    .map((wordPair) => wordPair.word)
                    .includes(pair.word) && "activeCheckboxButton"
                } `}
                onClick={() => handleNewWordToggle(pair)}
              ></button>
              <p className="commonText noMarginTopBottom">
                <span className="highlightedText">{pair.word}</span> -{" "}
                {pair.translated}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VocabularyView;
