import "../styles/Chat.scss";

const ChatInput = (props: any) => {
  
    const handleEnterPress = (key: any) => {
      if (key == "Enter") {
        handleSendMessage()
      }
    }

    const { newMessage, setNewMessage, handleSendMessage } = props
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