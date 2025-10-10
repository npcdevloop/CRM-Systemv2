import { NavLink } from 'react-router-dom';

import classes from './Tab.module.css'
import type { TodoInfo } from '../interface/interface';

function Tab({ all, completed, inWork }: TodoInfo) {
    return (
        <section className={classes.tabContent}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="" className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }>Все ({all})</NavLink>
                    </li>
                    <li>
                        <NavLink to="inwork" className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }>В работе ({inWork})</NavLink>
                    </li>
                    <li>
                        <NavLink to="completed" className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }>Сделано ({completed})</NavLink>
                    </li>
                </ul>
            </nav>
        </section >
    );
}

export default Tab;