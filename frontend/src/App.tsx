import ChatContainer from "./Chat/ChatContainer";
import ControlPanel from "./ControlPanel/ControlPanel";
import "./styles/App.scss";
import TranslationPanel from "./TranslationPanel/TranslationPanel";

const App = () => {
  return (
    <div className="App">
      <ControlPanel/>
      <ChatContainer/>
      <TranslationPanel/>
    </div>
  );
};

export default App;
