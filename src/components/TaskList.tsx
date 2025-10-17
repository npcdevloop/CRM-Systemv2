import classes from './TaskList.module.css'
import Task from "./Task";
import type { MetaResponse, Todo, TodoInfo, fetchTasks } from "../types/interface";


function TaskList({ data, meta, fetchTasks }: MetaResponse<Todo, TodoInfo> & fetchTasks) {

    return (
        <main className={classes.main}>
            {
                data?.map((todo: Todo) => (
                    <Task
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        created={todo.created}
                        isDone={todo.isDone}
                        fetchTasks={fetchTasks}
                    />
                ))
            }
            <meta name="Общее количество" content={meta.totalAmount.toString()} />
        </main>
    );
}

export default TaskList;