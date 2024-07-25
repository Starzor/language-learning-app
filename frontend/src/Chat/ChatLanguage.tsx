import "../styles/Chat.scss";
import { LANGUAGE_LIST } from "../constants";

const ChatLanguage = (props: any) => {
  const { language, setLanguage } = props;
  return (
    <select value={language} onChange={(event) => setLanguage(event.target.value)} className="languageSelect">
      {LANGUAGE_LIST.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default ChatLanguage;
