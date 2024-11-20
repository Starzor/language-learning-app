import Heading from "../Reusable/Heading";

interface ChatWelcomeProps {
  topics: Array<string>;
  onTopicClick: any;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ topics, onTopicClick }) => {
  return (
    <div className="chatWelcome">
      <h1 className="titleText">
        Vítejte v Chatovací aplikaci pro výuku jazyků
      </h1>
      <Heading center>Začněte psát nebo si vyberte z témat níže</Heading>
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
