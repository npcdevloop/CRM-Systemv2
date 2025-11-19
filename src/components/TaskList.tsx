import Task from "./Task";
import type { MetaResponse, Todo, TodoInfo } from "../types/interface";
import { List } from 'antd';

interface Props {
  updateTasks: () => void
}

function TaskList({ data, meta, updateTasks }: MetaResponse<Todo, TodoInfo> & Props) {

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={
          (todo) => (
            <Task
              todo={todo}
              updateTasks={updateTasks}
            />
          )
        }

      />
      <meta name="Общее количество" content={meta.totalAmount.toString()} />
    </>
  );
}

export default TaskList;