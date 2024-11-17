import ChatDifficulty from "./ChatDifficulty";
import ChatLanguage from "./ChatLanguage";

interface ChatSettingsProps {
  isTesting: boolean;
  onResetClick: any;
  onTestClick: any;
  difficulty: string;
  onDifficultyChange: any;
  language: string;
  onLanguageChange: any;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isTesting,
  onResetClick,
  onTestClick,
  difficulty,
  onDifficultyChange,
  language,
  onLanguageChange,
}) => {
  return (
    <div className="chatSettings">
      {!isTesting && (
        <>
          <div className="chatSettingsLeft">
            <button className="resetChat" onClick={onResetClick}>
              <img src={require("../../images/restart.png")} />
            </button>
          </div>
          <div className="chatSettingsRight">
            <button className="testButton headingText" onClick={onTestClick}>
              Test jazyku
            </button>
            <ChatDifficulty
              difficulty={difficulty}
              onDifficultyChange={onDifficultyChange}
            />
            <ChatLanguage language={language} onLanguageChange={onLanguageChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSettings;
