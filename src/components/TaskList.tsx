import { useAppSelector } from "../store/hooks";
import { selectTodosFull } from "../store/todo/selectors";
import Task from "./Task";
import { List } from 'antd';


function TaskList() {
  const { data } = useAppSelector(selectTodosFull)
  const todo = data?.data
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={todo}
      renderItem={
        (todo) => (
          <Task
            todo={todo}
          />
        )
      }
    />
  );
}

export default TaskList;