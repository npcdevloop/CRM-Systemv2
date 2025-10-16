import { NavLink } from 'react-router-dom';
import classes from './Tab.module.css'
import type { fetchTasks, TodoInfo } from "../types/interface";

function Tab({ all, completed, inWork, fetchTasks }: TodoInfo & fetchTasks) {
    return (
        <section className={classes.tabContent}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="" className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } onClick={() => fetchTasks('all')}>Все ({all})</NavLink>
                    </li>
                    <li>
                        <NavLink to="inWork" className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } onClick={() => fetchTasks('inWork')}>В работе ({inWork})</NavLink>
                    </li>
                    <li>
                        <NavLink to="completed" className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } onClick={() => fetchTasks('completed')}>Сделано ({completed})</NavLink>
                    </li>
                </ul>
            </nav>
        </section >
    );
}

export default Tab;