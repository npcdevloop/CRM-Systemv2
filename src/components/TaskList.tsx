import classes from './TaskList.module.css'
import Task from "./Task";
import type { Todo, TodosProps } from "../interface/interface";

function TaskList({ todos }: TodosProps) {

    return (
        <main className={classes.main}>
            {
                todos.map((todo: Todo) => (
                    <Task
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        created={todo.created}
                        isDone={todo.isDone}
                    />
                ))
            }

        </main>
    );
}

export default TaskList;