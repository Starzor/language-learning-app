import { Message } from "../../models/Message";
import "../../styles/SidePanel.scss";

interface ControlPanelProps {
  controlMessage?: Message;
  controlOrReform?: string;
  isLoadingReform: boolean
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  controlMessage,
  controlOrReform,
}) => {
  return (
    <div className="sidePanel">
      <div className="tabList">
        <div
          className={`tabButton headingText ${
            controlMessage && controlOrReform == "control" && "active"
          }`}
        >
          Kontrola
        </div>
        <div
          className={`tabButton headingText ${
            controlMessage && controlOrReform == "reform" && "active"
          }`}
        >
          Reformulace
        </div>
      </div>
      {controlMessage && controlOrReform == "control" && (
        <div className="sidePanelInnerContainer">
          {controlMessage.correction != "" && (
            <>
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
            </>
          )}
          {!controlMessage.correction && controlOrReform == "control" && (
            <p className="commonText">Žádná chyba nenalezena...</p>
          )}
        </div>
      )}
      {controlMessage && controlOrReform == "reform" && (
        <div className="sidePanelInnerContainer">
          <p className="headingText">Původní text:</p>
          <div className="sidePanelTextContainer">
            <p
              className="commonText"
              dangerouslySetInnerHTML={{
                __html: controlMessage.text,
              }}
            ></p>
          </div>
          {controlMessage.reformed && (
            <>
              <p className="headingText">Reformulovaný text:</p>
              <div className="sidePanelTextContainer">
                <p
                  className="commonText"
                  dangerouslySetInnerHTML={{
                    __html: controlMessage.reformed
                      ? controlMessage.reformed
                      : "",
                  }}
                ></p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
