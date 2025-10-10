
import AddFieldForm from "./AddFieldForm"
import Tab from "../components/Tab"
import type { TodoInfo } from "../interface/interface";
import classes from './MainNavigation.module.css';


function MainNavigation({ all, completed, inWork }: TodoInfo) {
  return (
    <>
      <header className={classes.header}>
        <AddFieldForm method="POST" />
      </header>
      <Tab all={all} completed={completed} inWork={inWork} />
    </>
  );
}

export default MainNavigation;