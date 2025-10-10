import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import TaskList from "../components/TaskList";
import { AllLoader } from "../App";



function AllPage() {
    const resDataObj = useLoaderData()
    const todos = resDataObj.todos.data
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Загрузка...</p>}>
                <Await resolve={todos}>
                    {
                        (loadedTodos) => <TaskList todos={loadedTodos} />
                    }
                </Await>
            </Suspense>
        </>
    );
}

export default AllPage;

export async function Loader() {
    return {
        todos: await AllLoader(),
    };
}


