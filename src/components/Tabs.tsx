import { Tabs } from "antd";
import type { TabsProps } from 'antd';
import type { Filter } from '../types/interface';
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTodosFull } from "../store/todo/selectors";
import { setTab } from "../store/todo/Slices/slice";




function isFilter(key: unknown): key is Filter {
  const filter = ['all', 'completed', 'inWork'] as const;

  if (typeof key !== 'string') {
    return false;
  }

  return (filter as readonly string[]).includes(key);;
}

const Tab = memo(function Tab() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectTodosFull)
  const { all, inWork, completed } = data?.info || { all: 0, inWork: 0, completed: 0 }

  const onChangeActiveTab = (key: string) => {
    if (isFilter(key)) {
      dispatch(setTab(key))
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