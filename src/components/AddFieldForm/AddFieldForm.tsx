import classes from './AddFieldForm.module.css'
import { useRef, useState, type FormEvent } from 'react';
import { createTask } from '../../api/api';
import type { updateTasks } from '../../types/interface';

function AddFieldForm({ updateTasks }: updateTasks) {
    const [error, setError] = useState<boolean>();
    const [errorText, setErrorText] = useState<string>('');
    const input = useRef<HTMLInputElement>(null)

    async function createTaskSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const title = input.current?.value.trim() ?? ''

        if (title.trim() === '' || title.length <= 1) {
            event.preventDefault()
            setErrorText("Ошибка сохранения! Минимум 2 символа, максимум 64!")
            setError(true)
        } else if (title.length >= 2 && title.length <= 64) {
            setErrorText('')
            setError(false)
            await createTask(title);
            await updateTasks();
        }
    }

    return (
        <>
            <form onSubmit={createTaskSubmit}>
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
            </form>
            {error ? <p className={classes.error}>{errorText}</p> : ''}
        </>

    );
}

export default AddFieldForm;


