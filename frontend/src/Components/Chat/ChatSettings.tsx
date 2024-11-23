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
  loading: boolean;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isTesting,
  onResetClick,
  onTestClick,
  difficulty,
  onDifficultyChange,
  language,
  onLanguageChange,
  loading,
}) => {
  return (
    <div className="chatSettings">
      {!isTesting && (
        <>
          <div className="chatSettingsLeft">
            <button className="resetChat" disabled={loading} onClick={onResetClick}>
              <img src={require("../../images/restart.png")} />
            </button>
          </div>
          <div className="chatSettingsRight">
            <button className="testButton headingText" disabled={loading} onClick={onTestClick}>
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
    </div>
  );
};

export default ChatSettings;
