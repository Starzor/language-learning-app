import { Message } from "../../models/Message";
import "../../styles/SidePanel.scss";

interface ControlPanelProps {
  controlMessage?: Message;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ controlMessage }) => {
  return (
    <div className="sidePanel">
      <div className="tabList">
        <div className={`tabButton headingText ${controlMessage && "active"}`}>
          Kontrola
        </div>
      </div>
      {controlMessage && (
        <div className="sidePanelInnerContainer">
          <p className="headingText">Původní text:</p>
          <div className="sidePanelTextContainer">
            <p
              className="commonText"
              dangerouslySetInnerHTML={{
                __html: controlMessage.incorrectText
                  ? controlMessage.incorrectText
                  : "",
              }}
            ></p>
          </div>
          <p className="headingText">Opravený text:</p>
          <div className="sidePanelTextContainer">
            <p
              className="commonText"
              dangerouslySetInnerHTML={{
                __html: controlMessage.correction
                  ? controlMessage.correction
                  : "",
              }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
