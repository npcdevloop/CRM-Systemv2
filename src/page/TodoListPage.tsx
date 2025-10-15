
import { useEffect, useState } from "react";
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
            const tasks = await AllLoader()
            setData(tasks)
        } catch (error) {
            setError(error || "Faild to fetch tasks.")
        } finally {
            setLoading(false)
        }
    }

    async function updateTasks() {
        try {
            const tasks = await AllLoader()
            setData(tasks)
        } catch (error) {
            setError(error || "Faild to fetch tasks.")
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <>
            <MainNavigation
                all={data?.info?.all ?? 0}
                completed={data?.info?.completed ?? 0}
                inWork={data?.info?.inWork ?? 0}
                fetchTasks={updateTasks}
            />

            {loading && <p style={{ textAlign: "center", marginTop: "20rem" }}>Tasks loading...</p>}
            {error && <p style={{ textAlign: "center", marginTop: "20rem" }}>Tasks error...</p>}

            <TaskList
                data={data?.data ?? []}
                meta={data?.meta ?? { totalAmount: 0 }}
                fetchTasks={updateTasks}
            />
        </>
    );
}


export default TodoListPage;

