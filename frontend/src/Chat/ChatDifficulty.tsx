import "../styles/Chat.scss";
import { DIFFICULTY_LIST } from "../constants";

const ChatDifficulty = (props: any) => {
  const { difficulty, setDifficulty } = props;
  return (
    <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="difficultySelect">
      {DIFFICULTY_LIST.map((diff) => (
        <option key={diff} value={diff}>{diff}</option>
      ))}
    </select>
  );
};

export default ChatDifficulty;
