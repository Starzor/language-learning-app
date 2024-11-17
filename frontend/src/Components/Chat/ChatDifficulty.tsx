import { DIFFICULTY_LIST } from "../../constants";
import { SetStateAction } from "react";
import "../../styles/Chat.scss";

interface ChatDifficultyProps {
  difficulty: string;
  onDifficultyChange: React.Dispatch<SetStateAction<string>>;
}

const ChatDifficulty: React.FC<ChatDifficultyProps> = ({difficulty, onDifficultyChange}) => {
  return (
    <select value={difficulty} onChange={(event) => onDifficultyChange(event.target.value)} className="difficultySelect headingText">
      {DIFFICULTY_LIST.map((diff) => (
        <option key={diff} value={diff}>{diff}</option>
      ))}
    </select>
  );
};

export default ChatDifficulty;
