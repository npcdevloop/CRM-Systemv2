
import { useEffect, useRef } from "react";
import TaskList from "../components/TaskList";
import { Alert, Flex, Spin } from "antd";
import AddFieldForm from "../components/AddFieldForm";
import Tabs from "../components/Tabs";
import { selectTab, selectTodosFull } from "../store/todo/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTodosByFilter } from "../store/apiThunk";

function TodoListPage() {
  const dispatch = useAppDispatch();
  const { data, status: listStatus } = useAppSelector(selectTodosFull)
  const tab = useAppSelector(selectTab)
  const delay: number = 5000;
  const timerId = useRef<ReturnType<typeof setInterval>>(0);

  const updateDataTasks = async () => {
    await dispatch(fetchTodosByFilter(tab))
  }

  useEffect(() => {

    updateDataTasks()

    timerId.current = setInterval(updateDataTasks, delay)

    return () => {
      clearInterval(timerId.current)
    };

  }, [dispatch, tab])

  return (
    <Flex vertical>

      <AddFieldForm />
      <Tabs />

      {listStatus.isLoading && !data && <Spin size="large" />}
      {listStatus.hasError && <Alert
        message="Ошибка"
        description="Произошла ошибка при загрузке задач."
        type="error"
        showIcon
      />}

      <TaskList />
    </Flex>
  );
}


export default TodoListPage;
