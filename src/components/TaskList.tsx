import Task from "./Task";
import type { MetaResponse, Todo, TodoInfo } from "../types/interface";
import { List } from 'antd';

interface updateTasks {
  updateTasks: () => Promise<MetaResponse<Todo, TodoInfo>> | Promise<void>
}

function TaskList({ data, meta, updateTasks }: MetaResponse<Todo, TodoInfo> & updateTasks) {

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={
          (data) => (
            <Task
              key={data.id}
              id={data.id}
              title={data.title}
              created={data.created}
              isDone={data.isDone}
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