import { useEffect, useState } from "react";
import { Message } from "../../models/Message";
import "../../styles/Reusable/TabList.scss";
import "../../styles/SidePanel.scss";
import TabList, { Tab } from "../Reusable/TabList";
import ControlView from "./ControlView";
import ReformView from "./ReformView";
import Loading from "../Reusable/Loading";

interface ControlPanelProps {
  controlMessage?: Message;
  controlOrReform?: string;
  onControlTabClick: (message?: Message) => void;
  onReformulateTabClick: (message?: Message, id?: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  controlMessage,
  controlOrReform,
  onControlTabClick,
  onReformulateTabClick,
}) => {
  const tabs: Array<Tab> = [
    {
      name: "Kontrola",
      onClick: () => onControlTabClick(controlMessage),
      disabled: controlMessage ? false : true,
    },
    {
      name: "Reformulace",
      onClick: () =>
        onReformulateTabClick(
          controlMessage,
          controlMessage ? controlMessage.id : undefined
        ),
      disabled: controlMessage ? false : true,
    },
  ];
  const [activeId, setActiveId] = useState<number>();

  useEffect(() => {
    setActiveId(tabs.findIndex((tab) => tab.name == controlOrReform));
  }, [controlOrReform]);

  return (
    <div className="sidePanel">
      <TabList tabs={tabs} activeId={activeId} />
      {controlMessage && controlOrReform == "Kontrola" && (
        <ControlView controlMessage={controlMessage} />
      )}
      {controlMessage && controlOrReform == "Reformulace" && (
        <ReformView reformMessage={controlMessage} />
      )}
      {!controlMessage && controlOrReform == "Reformulace" && (
        <div className="loadingContainer">
          <Loading width={100} height={100} />
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
