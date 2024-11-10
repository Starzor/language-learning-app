import { DIFFICULTY_LIST } from "../../constants";
import { SetStateAction } from "react";
import "../../styles/Chat.scss";

interface ChatDifficultyProps {
  difficulty: string;
  setDifficulty: React.Dispatch<SetStateAction<string>>;
}

const ChatDifficulty: React.FC<ChatDifficultyProps> = ({difficulty, setDifficulty}) => {
  return (
    <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="difficultySelect">
      {DIFFICULTY_LIST.map((diff) => (
        <option key={diff} value={diff}>{diff}</option>
      ))}
    </select>
  );
};

export default ChatDifficulty;
