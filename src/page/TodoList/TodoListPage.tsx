
import { useEffect, useState } from "react";
import type { Filter, MetaResponse, Todo, TodoInfo } from "../../types/interface";
import TaskList from "../../components/TaskList/TaskList";
import { loadTasksByFilter } from "../../api/api";
import AddFieldForm from "../../components/AddFieldForm/AddFieldForm";
import Tabs from "../../components/Tabs/Tabs";

function TodoListPage() {
    const [data, setData] = useState<MetaResponse<Todo, TodoInfo>>({
        data: [],
        info: {
            all: 0,
            inWork: 0,
            completed: 0
        },
        meta: {
            totalAmount: 0
        }
    })
    const [tab, setTab] = useState<Filter>('all');
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | unknown>()

    useEffect(() => {
        setLoading(true)
        updateTasks()
        setLoading(false)
    }, [tab])

    async function updateTasks() {
        try {
            const tasks = await loadTasksByFilter(tab)
            setData(tasks)
        } catch (error) {
            setError(error || "Faild to fetch tasks.")
        }
    }


    return (
        <>
            <header>
                <AddFieldForm
                    updateTasks={updateTasks}
                />
                <Tabs
                    all={data.info?.all ?? 0}
                    completed={data?.info?.completed ?? 0}
                    inWork={data?.info?.inWork ?? 0}
                    tab={tab}
                    setTab={setTab}
                />
            </header>

            {loading && <p style={{ textAlign: "center", marginTop: "20rem" }}>Tasks loading...</p>}
            {error && <p style={{ textAlign: "center", marginTop: "20rem" }}>Tasks error...</p>}

            <TaskList
                data={data.data}
                meta={data.meta}
                updateTasks={updateTasks}
            />
        </>
    );
}


export default TodoListPage;

