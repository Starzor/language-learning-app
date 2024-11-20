import { useEffect, useState } from "react";
import { Message } from "../../models/Message";
import "../../styles/Reusable/TabList.scss";
import "../../styles/SidePanel.scss";
import TabList from "../Reusable/TabList";
import ControlView from "./ControlView";
import ReformView from "./ReformView";
import Loading from "../Reusable/Loading";

interface ControlPanelProps {
  controlMessage?: Message;
  controlOrReform?: string;
  isLoadingReform: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  controlMessage,
  controlOrReform,
}) => {
  const tabs: Array<string> = ["Kontrola", "Reformulace"];
  const [activeId, setActiveId] = useState<number>();

  useEffect(() => {
    setActiveId(tabs.findIndex((tab) => tab == controlOrReform));
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
          <Loading width={100} height={100}/>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
