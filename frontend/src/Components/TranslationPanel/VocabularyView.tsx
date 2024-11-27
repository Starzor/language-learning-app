import React from "react";
import { Message, WordTrio } from "../../models/Message";
import "../../styles/SidePanel.scss";
import CheckboxButton from "../Reusable/CheckboxButton";
import Paragraph from "../Reusable/Paragraph";
import Heading from "../Reusable/Heading";
import { NON_LATIN_SCRIPT_LANGUAGES } from "../../constants";

interface VocabularyViewProps {
  translationMessage: Message;
  handleNewWordToggle: (wordPair: WordTrio) => void;
  newWords: Array<WordTrio>;
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
        Stisknutím checkboxu vedle slova jej přidáte do Nových slov (systém se tyto slova pokusí používat častěji)
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
              <span className="highlightedText">
                {pair.word}{" "}
                {translationMessage.language &&
                NON_LATIN_SCRIPT_LANGUAGES.includes(translationMessage.language)
                  ? `(${pair.latin})`
                  : ""}
              </span>{" "}
              - {pair.translated}
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
              <span className="highlightedText">
                {pair.word}{" "}
                {translationMessage.language &&
                NON_LATIN_SCRIPT_LANGUAGES.includes(translationMessage.language)
                  ? `(${pair.latin})`
                  : ""}
              </span>{" "}
              - {pair.translated}
            </Paragraph>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VocabularyView;
