import CancelIcon from '../assets/cancel.png'
import SaveIcon from '../assets/save.png'
import EditIcon from '../assets/edit.png'
import DeleteIcon from '../assets/delete.png'
import classes from './Task.module.css'
import { useFetcher } from 'react-router-dom';
import { useRef, useState } from 'react';
import type { fetchTasks, Todo } from '../types/interface'



function Task({ id, title, created, isDone, fetchTasks }: Todo & fetchTasks) {
    const fetcher = useFetcher()
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);

    function deleteHandler() {
        fetcher.submit({ 'id': id }, { method: "DELETE" })
        setTimeout(fetchTasks, 100)
    }

    function editHandler() {
        setEdit(true)
    }

    function editCancelHandler() {
        setEdit(false)
        setError('')
    }

    function handleSubmit() {
        const title = inputRef.current?.value ?? ''
        if (title.trim() === '' || title.length <= 1) {
            setError("Ошибка сохранения! Минимум 2 символа, максимум 64!")
        } else if (title.length >= 2 && title.length <= 64) {
            setError('')
            fetcher.submit({
                'id': id,
                'title': title
            }, { method: "PUT" })
            setTimeout(fetchTasks, 100)
            setEdit(false)
        }
    }

    function handleChecked(event: { target: { checked: boolean; }; }) {
        fetcher.submit({
            'id': id,
            'title': title,
            'isDone': event.target.checked
        }, { method: "PUT" })
        setTimeout(fetchTasks, 200)
    }

    return (
        <>
            {!error ? '' : <p className={classes.error}>{error}</p>}
            <p key={id} className={classes.taskContent}>
                <input
                    className={classes.checkbox}
                    type="checkbox"
                    defaultChecked={isDone}
                    onChange={handleChecked}
                />

                {!edit ?
                    <span className={classes.title}>{title}</span> :
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
                }
                <span className={classes.buttonGroup}>
                    <button onClick={!edit ? editHandler : handleSubmit} className={classes.edit}>
                        <img src={!edit ? EditIcon : SaveIcon} alt="edit icon" />
                    </button>
                    <button onClick={!edit ? deleteHandler : editCancelHandler} className={classes.delete}>
                        <img src={!edit ? DeleteIcon : CancelIcon} alt="delete icon" />
                    </button>
                </span>
                <meta name="Дата" content={created} />
            </p>
        </>
    );
}

export default Task;

