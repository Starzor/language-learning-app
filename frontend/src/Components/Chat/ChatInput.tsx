import { KeyboardEvent, SetStateAction, useRef } from "react";
import "../../styles/Chat.scss";
import Loading from "../Reusable/Loading";

interface ChatInputProps {
  loading: boolean;
  newMessage: string;
  setNewMessage: React.Dispatch<SetStateAction<string>>;
  handleSendMessage: (isRetry?: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  loading,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleCtrlEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === "Enter") {
      setNewMessage(prevMessage => prevMessage + "\n");
    } else if (event.key == "Enter") {
      handleSendMessage();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setNewMessage(event.target.value);
  };

  return (
    <>
      {" "}
      {!loading && (
        <div className="chatInput">
          <textarea
            ref={textareaRef}
            className="messageInput helperText"
            placeholder="Napište zprávu a stiskněte Enter..."
            value={newMessage}
            onChange={handleInput}
            onKeyDown={(event) => handleCtrlEnterPress(event)}
          />
          <button onClick={() => handleSendMessage()} className="sendButton">
            <img src={require("../../images/send_icon.png")} />
          </button>
        </div>
      )}
      {loading && <Loading />}
    </>
  );
};

export default ChatInput;
