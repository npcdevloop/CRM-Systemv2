
import classes from './Tabs.module.css'
import type { TodoInfo, Filter, setTab } from "../../types/interface";


function Tabs({ all, completed, inWork, tab, setTab }: TodoInfo & setTab) {

    function selectTab(filter: Filter) {
        setTab(filter);

    }

    return (
        <section className={classes.tabContent}>
            <nav>
                <ul className={classes.list} >
                    <li>
                        <a
                            className={(tab === 'all') ? classes.active : ''}
                            onClick={() => { selectTab('all') }}>
                            Все ({all})
                        </a>
                    </li>
                    <li>
                        <a
                            className={(tab === 'inWork') ? classes.active : ''}
                            onClick={() => { selectTab('inWork') }}>
                            В работе ({inWork})
                        </a>
                    </li>
                    <li>
                        <a
                            className={(tab === 'completed') ? classes.active : ''}
                            onClick={() => { selectTab('completed') }}>
                            Сделано ({completed})
                        </a>
                    </li>
                </ul>
            </nav>
        </section >
    );
}

export default Tabs;