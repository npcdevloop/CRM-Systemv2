import { Tabs } from "antd";
import type { TabsProps } from 'antd';
import type { TodoInfo } from '../types/interface';
import { memo } from "react";

const filter = ['all', 'completed', 'inWork'] as const;
type Filter = (typeof filter)[number];

interface SetTab {
  tab?: Filter,
  setTab: (filter: Filter) => void
}

function isFilter(key: any): key is Filter {
  return filter.includes(key);
}

const Tab = memo(function Tab({ all, completed, inWork, setTab }: TodoInfo & SetTab) {

  const onChangeActiveTab = (key: string) => {
    if (isFilter(key)) {
      setTab(key)
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Все (${all})`,
    },
    {
      key: 'inWork',
      label: `В работе (${inWork})`,
    },
    {
      key: 'completed',
      label: `Сделано (${completed})`,
    },
  ];



  return (
    <Tabs defaultActiveKey="all" items={items} onChange={onChangeActiveTab} centered={true} size="large" />
  );
}
)
export default Tab;