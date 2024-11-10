import ChatContainer from "./Components/Chat/ChatContainer";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import "./styles/App.scss";
import TranslationPanel from "./Components/TranslationPanel/TranslationPanel";

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
