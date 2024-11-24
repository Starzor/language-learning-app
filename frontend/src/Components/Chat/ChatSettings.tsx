import { SetStateAction } from "react";
import ChatDifficulty from "./ChatDifficulty";
import ChatLanguage from "./ChatLanguage";
import Paragraph from "../Reusable/Paragraph";

interface ChatSettingsProps {
  difficulty: string;
  language: string;
  loading: boolean;
  isTesting: boolean;
  currentQuestion: number;
  onResetClick: () => void;
  onTestClick: () => void;
  onDifficultyChange: React.Dispatch<SetStateAction<string>>;
  onLanguageChange: React.Dispatch<SetStateAction<string>>;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isTesting,
  difficulty,
  language,
  loading,
  currentQuestion,
  onResetClick,
  onTestClick,
  onDifficultyChange,
  onLanguageChange,
}) => {
  return (
    <div className="chatSettings">
      {!isTesting && (
        <>
          <div className="chatSettingsLeft">
            <button
              className="resetChat"
              disabled={loading}
              onClick={onResetClick}
            >
              <img src={require("../../images/restart.png")} />
            </button>
          </div>
          <div className="chatSettingsRight">
            <button
              className="testButton headingText"
              disabled={loading}
              onClick={onTestClick}
            >
              Test jazyku
            </button>
            <ChatDifficulty
              disabled={loading}
              difficulty={difficulty}
              onDifficultyChange={onDifficultyChange}
            />
            <ChatLanguage
              disabled={loading}
              language={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </>
      )}
      {isTesting && (
        <div className="testProgress">
          <Paragraph center>Otázka {currentQuestion} z 10</Paragraph>
        </div>
      )}
    </div>
  );
};

export default ChatSettings;
