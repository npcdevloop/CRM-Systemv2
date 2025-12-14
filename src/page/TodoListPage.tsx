
import { useCallback, useEffect, useRef } from "react";
import TaskList from "../components/TaskList";
import { Alert, Flex, Spin } from "antd";
import AddTaskForm from "../components/AddTaskForm";
import TabPanel from "../components/TabPanel";
import { selectTab, selectTodosFull } from "../store/todo/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTodosByFilter, loadProfileUserAuth } from "../store/apiThunk";

function TodoListPage() {
  const dispatch = useAppDispatch();
  const { data, status: listStatus } = useAppSelector(selectTodosFull)
  const filter = useAppSelector(selectTab)
  const delay: number = 5000;
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateDataTasks = useCallback(() => {
    dispatch(fetchTodosByFilter(filter.data ?? "all"))
  }, [dispatch, filter])

  useEffect(() => {
    dispatch(loadProfileUserAuth())
    updateDataTasks()

    timerId.current = setInterval(updateDataTasks, delay)

    return () => {
      if (timerId.current !== null) {
        clearInterval(timerId.current)
      }

    };

  }, [dispatch, updateDataTasks])

  return (
    <Flex vertical>

      <AddTaskForm />
      <TabPanel />

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
