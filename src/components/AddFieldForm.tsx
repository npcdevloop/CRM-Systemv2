
import { Form, type HTMLFormMethod } from 'react-router-dom';
import classes from './AddFieldForm.module.css'
import { useRef, useState, type FormEvent } from 'react';
import type { fetchTasks } from '../types/interface';

function AddFieldForm({ method, fetchTasks }: { method: HTMLFormMethod } & fetchTasks) {
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const input = useRef<HTMLInputElement>(null)

    function checkSubmit(event: FormEvent<HTMLFormElement>) {
        const userInput = input.current?.value.trim() ?? ''
        if (userInput?.trim() === '') {
            event.preventDefault()
            setError(true)
            setErrorText('Невозможно создать пустую задачу!')
        } else if (userInput?.length <= 1) {
            event.preventDefault()
            setError(true)
            setErrorText('Минимальное количество символов 2!')
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
            {!error ? '' : <p className={classes.error}>{errorText}</p>}
        </Form>
    );
}

export default AddFieldForm;


