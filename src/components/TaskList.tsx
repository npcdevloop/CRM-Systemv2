import classes from './TaskList.module.css'
import Task from "./Task";
import type { MetaResponse, Todo, TodoInfo, fetchTasks } from "../types/interface";
import { useLocation } from 'react-router-dom';


function TaskList({ data, meta, fetchTasks }: MetaResponse<Todo, TodoInfo> & fetchTasks) {
    const location = useLocation()
    let task;

    if (location.pathname === '/') {
        task = data
    } else if (location.pathname === '/inwork') {
        task = data.filter((task: Todo) => {
            return task.isDone === false
        })
    } else if (location.pathname === '/completed') {
        task = data.filter((task: Todo) => {
            return task.isDone === true
        })
    }

    return (
        <main className={classes.main}>
            {
                task?.map((todo: Todo) => (
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