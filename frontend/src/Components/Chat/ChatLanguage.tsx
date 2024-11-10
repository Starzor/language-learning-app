import { LANGUAGE_LIST } from "../../constants";
import { SetStateAction } from "react";
import "../../styles/Chat.scss";

interface ChatLanguageProps {
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
}

const ChatLanguage: React.FC<ChatLanguageProps> = ({ language, setLanguage}) => {
  return (
    <select value={language} onChange={(event) => setLanguage(event.target.value)} className="languageSelect">
      {LANGUAGE_LIST.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default ChatLanguage;
