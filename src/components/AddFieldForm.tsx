
import { Form, type HTMLFormMethod } from 'react-router-dom';
import classes from './AddFieldForm.module.css'
import { useRef, useState, type FormEvent } from 'react';
import type { fetchTasks } from '../types/interface';

function AddFieldForm({ method, fetchTasks }: { method: HTMLFormMethod } & fetchTasks) {
    const [error, setError] = useState(false);
    const input = useRef<HTMLInputElement>(null)

    function checkSubmit(event: FormEvent<HTMLFormElement>) {
        const userInput = input.current?.value
        if (userInput?.trim() === '') {
            event.preventDefault()
            setError(true)
        } else {
            setError(false)
        }
        setTimeout(fetchTasks, 100)
    }

    return (
        <Form method={method} onSubmit={checkSubmit}>
            <ul className={classes.list}>
                <li>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Task To Be Done..."
                        className={classes.search}
                        minLength={2}
                        maxLength={64}
                        ref={input}
                        required
                    />
                </li>
                <li>
                    <button className={classes.add}>Add</button>
                </li>
            </ul>
            {!error ? '' : <p className={classes.error}>Невозможно создать пустую задачу!</p>}
        </Form>
    );
}

export default AddFieldForm;


