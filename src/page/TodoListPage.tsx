
import { useEffect, useState, useMemo } from "react";
import { AllLoader } from "../api/api";
import MainNavigation from "../components/MainNavigation";
import type { MetaResponse, Todo, TodoInfo } from "../types/interface";
import TaskList from "../components/TaskList";

function TodoListPage() {
    const [data, setData] = useState<MetaResponse<Todo, TodoInfo> | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | unknown>()

    async function fetchTasks() {
        setLoading(true)
        try {
            const tasks = await AllLoader('all')
            setData(tasks)
        } catch (error) {
            setError(error || "Faild to fetch tasks.")
        } finally {
            setLoading(false)
        }
    }

    async function updateTasks(filter: string) {
        try {
            const tasks = await AllLoader(filter)
            setData(tasks)
        } catch (error) {
            setError(error || "Faild to fetch tasks.")
        }
    }

    const visibleTodos = useMemo(
        () => {
            return data;
        },
        [data]
    );


    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <>
            <MainNavigation
                fetchTasks={updateTasks}
                all={visibleTodos?.info?.all ?? 0}
                completed={visibleTodos?.info?.completed ?? 0}
                inWork={visibleTodos?.info?.inWork ?? 0}
            />

            {loading && <p style={{ textAlign: "center", marginTop: "20rem" }}>Tasks loading...</p>}
            {error && <p style={{ textAlign: "center", marginTop: "20rem" }}>Tasks error...</p>}

            <TaskList
                data={visibleTodos?.data ?? []}
                meta={visibleTodos?.meta ?? { totalAmount: 0 }}
                fetchTasks={updateTasks}

            />
        </>
    );
}


export default TodoListPage;

