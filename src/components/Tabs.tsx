import { Tabs } from "antd";
import type { TabsProps } from 'antd';
import type { Filter, setTab, TodoInfo } from '../types/interface';

function Tab({ all, completed, inWork, setTab }: TodoInfo & setTab) {

    const onChange = (key: string) => {
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
        <Tabs defaultActiveKey="all" items={items} onChange={onChange} centered={true} size="large" />
    );
}

export default Tab;