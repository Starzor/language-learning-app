import { SetStateAction } from "react";
import "../styles/Chat.scss";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: React.Dispatch<SetStateAction<string>>;
  handleSendMessage: any;
}

const ChatInput: React.FC<ChatInputProps> = ({newMessage, setNewMessage, handleSendMessage}) => {
    const handleEnterPress = (key: any) => {
      if (key == "Enter") {
        handleSendMessage()
      }
    }

    return (
        <div className="chatInput">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            onKeyDown={(event) => handleEnterPress(event.key)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default ChatInput