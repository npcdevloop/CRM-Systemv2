import CancelIcon from '../../assets/cancel.png'
import SaveIcon from '../../assets/save.png'
import EditIcon from '../../assets/edit.png'
import DeleteIcon from '../../assets/delete.png'
import classes from './Task.module.css'
import { useRef, useState } from 'react';
import type { Todo, updateTasks } from '../../types/interface'
import { deleteTask, updateTaskByDoneFlag, updateTaskTitle } from '../../api/api'



function Task({ id, title, created, isDone, updateTasks }: Todo & updateTasks) {
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);

    function activeEditHandler() {
        setEdit(true)
    }

    function cancelEditHandler() {
        setEdit(false)
        setError('')
    }

    async function deleteHandler() {
        await deleteTask(id)
        await updateTasks()
    }

    async function handleSubmit() {
        const title = inputRef.current?.value.trim() ?? ''

        if (title.trim() === '' || title.length <= 1) {

            setError("Ошибка сохранения! Минимум 2 символа, максимум 64!")

        } else if (title.length >= 2 && title.length <= 64) {
            setError('')

            await updateTaskTitle(id, title)
            await updateTasks()

            setEdit(false)
        }
    }

    async function handleChecked(event: { target: { checked: boolean; }; }) {
        await updateTaskByDoneFlag(id, event.target.checked)
        await updateTasks()
    }

    return (
        <>
            {!error ? '' : <p className={classes.error}>{error}</p>}

            <li key={id} className={classes.taskContent}>

                <input
                    className={classes.checkbox}
                    type="checkbox"
                    defaultChecked={isDone}
                    onChange={handleChecked}
                />

                {!edit
                    ?
                    <>
                        <span className={classes.title}>{title}</span>

                        <div className={classes.buttonGroup}>
                            <button onClick={activeEditHandler} className={classes.edit}>
                                <img src={EditIcon} alt="edit button" />
                            </button>

                            <button onClick={deleteHandler} className={classes.delete}>
                                <img src={DeleteIcon} alt="delete button" />
                            </button>
                        </div>
                    </>
                    :
                    <form className={classes.formEdit} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id='title'
                            name='title'
                            className={classes.title}
                            defaultValue={title ?? ''}
                            ref={inputRef}
                            minLength={2}
                            maxLength={64}
                            required />

                        <div className={classes.buttonGroup}>
                            <button type='submit' className={classes.edit}>
                                <img src={SaveIcon} alt="save button" />
                            </button>

                            <button onClick={cancelEditHandler} className={classes.cancel}>
                                <img src={CancelIcon} alt="cancel button" />
                            </button>
                        </div>

                    </form>
                }

                <meta name="Дата" content={created} />
            </li >
        </>
    );
}

export default Task;

