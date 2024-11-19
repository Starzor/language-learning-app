interface ChatWelcomeProps {
  topics: Array<string>;
  onTopicClick: any;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ topics, onTopicClick }) => {
  return (
    <div className="chatWelcome">
      <h1 className="titleText centerText">
        Vítejte v Chatovací aplikaci pro výuku jazyků
      </h1>
      <h2 className="headingText centerText">
        Začněte psát nebo si vyberte z témat níže
      </h2>
      <div className="topicContainer">
        {topics.map((topic, index) => (
          <button key={index} className="helperText" onClick={() => onTopicClick(topic)}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatWelcome;
