import { Tabs } from "antd";
import type { TabsProps } from 'antd';
import type { Filter, TodoInfo } from '../types/interface';
import { memo } from "react";

interface setTab {
    tab?: Filter,
    setTab: (filter: Filter) => void
}

const Tab = memo(function Tab({ all, completed, inWork, setTab }: TodoInfo & setTab) {

    const onChangeActiveTab = (key: string) => {
        setTab(key as Filter)
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