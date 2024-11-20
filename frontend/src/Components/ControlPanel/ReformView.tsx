import { Message } from "../../models/Message";
import Heading from "../Reusable/Heading";
import Paragraph from "../Reusable/Paragraph";

interface ReformViewProps {
  reformMessage: Message;
}

const ReformView: React.FC<ReformViewProps> = ({ reformMessage }) => {
  return (
    <div className="sidePanelInnerContainer">
      <Heading>Původní text:</Heading>
      <div className="sidePanelTextContainer">
        <Paragraph dangerouslySetInnerHTML={reformMessage.text} />
      </div>
      {reformMessage.reformed && (
        <>
          <Heading>Reformulovaný text:</Heading>
          <div className="sidePanelTextContainer">
            <Paragraph
              dangerouslySetInnerHTML={
                reformMessage.reformed ? reformMessage.reformed : ""
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReformView;
