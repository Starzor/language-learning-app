import { SetStateAction } from "react";
import "../styles/Chat.scss";
import "../images/send_icon.png";

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
            className="messageInput"
            type="text"
            placeholder="Napište zprávu a stiskněte Enter..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            onKeyDown={(event) => handleEnterPress(event.key)}
          />
          <button onClick={handleSendMessage} className="sendButton">
            <img src={require("../images/send_icon.png")}/>
          </button>
        </div>
    )
}

export default ChatInput