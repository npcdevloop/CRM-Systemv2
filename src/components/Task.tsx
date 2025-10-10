import CancelIcon from '../assets/cancel.png'
import SaveIcon from '../assets/save.png'
import EditIcon from '../assets/edit.png'
import DeleteIcon from '../assets/delete.png'
import classes from './Task.module.css'
import type { Todo } from "../interface/interface";
import { useFetcher } from 'react-router-dom';
import { useRef, useState } from 'react';

interface RefObject<T> {
    readonly current: T
}

function Task({ id, title, created, isDone }: Todo) {
    const fetcher = useFetcher()
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef('') as unknown as RefObject<HTMLInputElement>;

    function deleteHandler() {
        fetcher.submit({ 'id': id }, { method: "DELETE" })
    }

    function editHandler() {
        setEdit(true)
    }

    function editCencelHandler() {
        setEdit(false)
        setError('')
    }

    function handleSubmit() {

        const title = inputRef?.current?.value.toString()
        if (title!.length >= 2 && title!.length <= 64) {
            setError('')
            fetcher.submit({
                'id': id,
                'title': title
            }, { method: "PUT" })
            setEdit(false)
        } else {
            setError("Ошибка сохранения! Минимум 2 символа, максимум 64!")
        }
    }

    function handleChecked(event: { target: { checked: boolean; }; }) {
        fetcher.submit({
            'id': id,
            'title': title,
            'isDone': event.target.checked
        }, { method: "PUT" })
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
                    <button onClick={!edit ? deleteHandler : editCencelHandler} className={classes.delete}>
                        <img src={!edit ? DeleteIcon : CancelIcon} alt="delete icon" />
                    </button>
                </span>
                <meta name="Дата" content={created} />
            </p>
        </>
    );
}

export default Task;


export async function Action({ request }: { request: Request }) {
    const data = await request.formData()
    const method = request.method;
    const tasksId = data.get('id')
    let url = 'https://easydev.club/api/v1/todos'

    if (method === 'PUT' && data.get('title')) {

        const taskData = {
            id: data.get('id'),
            title: data.get('title'),
        }

        url = 'https://easydev.club/api/v1/todos/' + tasksId

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (response.status === 422) {
            return response;
        }

        if (!response.ok) {
            throw new Response(JSON.stringify({ message: 'Could not save task.' }), {
                status: 500,
            });

        }
    }

    if (method === 'PUT' && data.get('isDone')) {

        const taskData = {
            id: data.get('id'),
            isDone: JSON.parse(data.get('isDone') as string),
        }

        url = 'https://easydev.club/api/v1/todos/' + tasksId

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (response.status === 422) {
            return response;
        }

        if (!response.ok) {
            throw new Response(JSON.stringify({ message: 'Could not save task.' }), {
                status: 500,
            });

        }
    }

    if (method === 'DELETE') {
        url = 'https://easydev.club/api/v1/todos/' + tasksId
        const response = await fetch(url, {
            method: method
        })
        if (!response.ok) {
            throw Response.json({ message: "Could not delete event" }, { status: 500 });
        }
    }
}
