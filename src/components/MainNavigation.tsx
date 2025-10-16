
import AddFieldForm from "./AddFieldForm"
import Tab from "../components/Tab"
import type { fetchTasks, TodoInfo } from "../types/interface";
import classes from './MainNavigation.module.css';


function MainNavigation({ all, completed, inWork, fetchTasks }: TodoInfo & fetchTasks) {
  return (
    <>
      <header className={classes.header}>
        <AddFieldForm method="POST" fetchTasks={fetchTasks} />
      </header>
      <Tab all={all} completed={completed} inWork={inWork} fetchTasks={fetchTasks} />
    </>
  );
}

export default MainNavigation;