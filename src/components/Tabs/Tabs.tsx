
import classes from './Tabs.module.css'
import type { TodoInfo, Filter, setTab } from "../../types/interface";


function Tabs({ all, completed, inWork, tab, setTab }: TodoInfo & setTab) {

    function toggleTab(filter: Filter) {
        setTab(filter);

    }

    return (
        <section className={classes.tabContent}>
            <nav>
                <ul className={classes.list} >
                    <li>
                        <a
                            className={(tab === 'all') ? classes.active : ''}
                            onClick={() => { toggleTab('all') }}>
                            Все ({all})
                        </a>
                    </li>
                    <li>
                        <a
                            className={(tab === 'inWork') ? classes.active : ''}
                            onClick={() => { toggleTab('inWork') }}>
                            В работе ({inWork})
                        </a>
                    </li>
                    <li>
                        <a
                            className={(tab === 'completed') ? classes.active : ''}
                            onClick={() => { toggleTab('completed') }}>
                            Сделано ({completed})
                        </a>
                    </li>
                </ul>
            </nav>
        </section >
    );
}

export default Tabs;