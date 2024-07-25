import "../styles/Chat.scss";

const ChatInput = (props: any) => {
    const { newMessage, setNewMessage, handleSendMessage } = props
    return (
        <div className="chatInput">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default ChatInput