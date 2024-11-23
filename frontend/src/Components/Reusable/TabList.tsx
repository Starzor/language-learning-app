interface TabListProps {
  tabs: Array<string>;
  activeId?: number;
}

const TabList: React.FC<TabListProps> = ({ tabs, activeId }) => {
  return (
    <div className="tabList">
      {tabs.map((tab, index) => (
        <h2 key={index} className={`tab ${activeId == index ? "active" : ""}`}>
          {tab}
        </h2>
      ))}
    </div>
  );
};

export default TabList;
