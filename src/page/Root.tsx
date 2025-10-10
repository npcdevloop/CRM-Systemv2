
import { AllLoader } from "../App";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useLoaderData } from "react-router-dom";



function RootLayout() {
    const resDataObj = useLoaderData()
    const { all, completed, inWork } = resDataObj.todos.info
    return (
        <>
            <MainNavigation all={all} completed={completed} inWork={inWork} />
            <Outlet />
        </>
    );
}

export default RootLayout;

export async function Loader() {
    return {
        todos: await AllLoader(),
    };
}
