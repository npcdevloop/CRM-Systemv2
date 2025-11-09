
import { useCallback, useEffect, useRef, useState } from "react";
import { loadTasksByFilter } from "../api/api";
import type { Filter, MetaResponse, Todo, TodoInfo } from "../types/interface";
import TaskList from "../components/TaskList";
import { Alert, Flex, Spin } from "antd";
import AddFieldForm from "../components/AddFieldForm";
import Tabs from "../components/Tabs";

function TodoListPage() {
  const [data, setData] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {
      all: 0,
      inWork: 0,
      completed: 0
    },
    meta: {
      totalAmount: 0
    }
  })
  const [tab, setTab] = useState<Filter>('all');
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>()
  const delay: number = 5000;
  const timerId = useRef<ReturnType<typeof setInterval>>(0);

  useEffect(() => {
    const updateDataTasks = async () => {
      try {
        setLoading(true)
        await updateTasks()
        setLoading(false)
      } catch {
        setError(false)
      }
    }

    updateDataTasks()

    timerId.current = setInterval(updateTasks, delay)

    return () => {
      clearInterval(timerId.current)
    };

  }, [tab])



  const updateTasks = useCallback(async () => {
    try {
      const tasks = await loadTasksByFilter(tab)
      setData(tasks)
    } catch {
      setError(true)
    }
  }
    , [tab])

  return (
    <Flex vertical>

      <AddFieldForm
        updateTasks={updateTasks}
      />
      <Tabs
        all={data.info?.all ?? 0}
        completed={data?.info?.completed ?? 0}
        inWork={data?.info?.inWork ?? 0}
        setTab={setTab}
      />

      {loading && <Spin size="large" />}
      {error && <Alert
        message="Ошибка"
        description="Произошла ошибка при загрузке задач."
        type="error"
        showIcon
      />}

      <TaskList
        data={data.data}
        meta={data.meta}
        updateTasks={updateTasks}
      />
    </Flex>
  );
}


export default TodoListPage;
