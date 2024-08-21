import { FC } from 'react';
import { Tab, Tabs } from 'react-tabs-scrollable';
import './tabpanel.css';

interface TabPanelProps {
  activeTab: any;
  onClick: (e: any, index: number) => void;
  tabs: Array<any>;
}
const TabPanel: FC<TabPanelProps> = ({ activeTab, onClick, tabs }) => {
  return (
    <Tabs
      activeTab={activeTab}
      onTabClick={onClick}
      rightBtnIcon={'>'}
      leftBtnIcon={'<'}
      leftNavBtnClassName={'bg-transparent hover:bg-teal-600 border-none'}
      rightNavBtnClassName={'bg-transparent hover:bg-teal-600 border-none'}
      navBtnStyle={{ width: 40, height: 40, borderRadius: 8 }}
      navBtnContainerClassName={'justify-center items-center '}
      tabsContainerClassName={'bg-transparent'}
    >
      {tabs.map((item: any, index: number) => (
        <Tab
          key={index}
          style={{ height: 40 }}
          className={'hover:bg-teal-400 border-none rounded'}
        >
          {item?.label}
        </Tab>
      ))}
    </Tabs>
  );
};

export default TabPanel;
