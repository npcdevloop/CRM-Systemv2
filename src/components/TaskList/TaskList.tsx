import classes from './TaskList.module.css'
import Task from "../Tasks/Task";
import type { MetaResponse, Todo, TodoInfo, updateTasks } from "../../types/interface";



function TaskList({ data, meta, updateTasks }: MetaResponse<Todo, TodoInfo> & updateTasks) {
    return (
        <ul className={classes.main}>
            {
                data.map((todo: Todo) => (
                    <Task
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        created={todo.created}
                        isDone={todo.isDone}
                        updateTasks={updateTasks}
                    />
                ))

            }
            <meta name="Общее количество" content={meta.totalAmount.toString()} />
        </ul>
    );
}

export default TaskList;