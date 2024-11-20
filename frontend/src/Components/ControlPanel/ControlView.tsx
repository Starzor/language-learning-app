import { Message } from "../../models/Message";
import Heading from "../Reusable/Heading";
import Paragraph from "../Reusable/Paragraph";

interface ControlViewProps {
  controlMessage: Message;
}

const ControlView: React.FC<ControlViewProps> = ({ controlMessage }) => {
  return (
    <div className="sidePanelInnerContainer">
      {controlMessage.correction && (
        <>
          <Heading>Původní text:</Heading>
          <div className="sidePanelTextContainer">
            <Paragraph
              dangerouslySetInnerHTML={
                controlMessage.incorrectText ? controlMessage.incorrectText : ""
              }
            />
          </div>
          <Heading>Opravený text:</Heading>
          <div className="sidePanelTextContainer">
            <Paragraph
              dangerouslySetInnerHTML={
                controlMessage.correction ? controlMessage.correction : ""
              }
            />
          </div>
        </>
      )}
      {!controlMessage.correction && (
        <Paragraph>Žádná chyba nenalezena...</Paragraph>
      )}
    </div>
  );
};

export default ControlView;
