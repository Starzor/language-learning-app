import { SetStateAction } from "react";
import "../../styles/Chat.scss";
import ChatLoading from "./ChatLoading";

interface ChatInputProps {
  loading: boolean;
  newMessage: string;
  setNewMessage: React.Dispatch<SetStateAction<string>>;
  handleSendMessage: any;
}

const ChatInput: React.FC<ChatInputProps> = ({
  loading,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  const handleEnterPress = (key: any) => {
    if (key == "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {" "}
      {!loading && (
        <div className="chatInput">
          <input
            className="messageInput helperText"
            type="text"
            placeholder="Napište zprávu a stiskněte Enter..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            onKeyDown={(event) => handleEnterPress(event.key)}
          />
          <button onClick={handleSendMessage} className="sendButton">
            <img src={require("../../images/send_icon.png")} />
          </button>
        </div>
      )}
      {loading && <ChatLoading />}
    </>
  );
};

export default ChatInput;
