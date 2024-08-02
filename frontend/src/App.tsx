import { useState } from "react";
import BagOfWords from "./BagOfWords";
import ChatContainer from "./Chat/ChatContainer";
import "./styles/App.scss";

const App = () => {
  const [bagOfWords, setBagOfWords] = useState([])

  return (
    <div className="App">
      <ChatContainer setBagOfWords={setBagOfWords}/>
      <BagOfWords bagOfWords={bagOfWords}/>
    </div>
  );
};

export default App;