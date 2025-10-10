import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import TaskList from "../components/TaskList";
import type { Todo } from "../interface/interface";
import { AllLoader } from "../App";

function InWorkPage() {
    const resDataObj = useLoaderData()
    const todos = resDataObj.todos.data.filter((task: Todo) => {
        return task.isDone === false
    })
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Загрузка...</p>}>
                <Await resolve={todos}>
                    {
                        (loadedTodos) => (
                            <TaskList todos={loadedTodos} />
                        )
                    }
                </Await>
            </Suspense>
        </>
    );
}

export default InWorkPage;

export async function Loader() {
    return {
        todos: await AllLoader(),
    };
}