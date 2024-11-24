export interface Tab {
  name: string;
  disabled?: boolean;
  onClick: (...args: any) => void;
}

interface TabListProps {
  tabs: Array<Tab>;
  activeId?: number;
}

const TabList: React.FC<TabListProps> = ({ tabs, activeId }) => {
  return (
    <div className="tabList">
      {tabs.map((tab, index) => (
        <button onClick={tab.onClick} disabled={tab.disabled} key={index} className={`tab ${activeId == index ? "active" : ""}`}>
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default TabList;
