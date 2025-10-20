
import { useLocation, type HTMLFormMethod, useFetcher } from 'react-router-dom';
import classes from './AddFieldForm.module.css'
import { useRef, useState, type FormEvent } from 'react';
import type { fetchTasks } from '../types/interface';

function AddFieldForm({ method, fetchTasks }: { method: HTMLFormMethod } & fetchTasks) {
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const input = useRef<HTMLInputElement>(null)
    const fetcher = useFetcher()
    const location = useLocation().pathname;

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
        setTimeout(() => fetchTasks(location.replace('/', '')), 100)
    }

    return (
        <fetcher.Form method={method} onSubmit={checkSubmit}>
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
                    <button className={classes.add}>Добавить</button>
                </li>
            </ul>
            {!error ? '' : <p className={classes.error}>{errorText}</p>}
        </fetcher.Form>
    );
}

export default AddFieldForm;


