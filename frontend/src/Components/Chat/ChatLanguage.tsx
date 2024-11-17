import { LANGUAGE_LIST } from "../../constants";
import { SetStateAction } from "react";
import "../../styles/Chat.scss";

interface ChatLanguageProps {
  language: string;
  onLanguageChange: React.Dispatch<SetStateAction<string>>;
}

const ChatLanguage: React.FC<ChatLanguageProps> = ({ language, onLanguageChange}) => {
  return (
    <select value={language} onChange={(event) => onLanguageChange(event.target.value)} className="languageSelect headingText">
      {LANGUAGE_LIST.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default ChatLanguage;
