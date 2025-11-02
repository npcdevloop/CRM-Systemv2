import classes from './AddFieldForm.module.css'
import { useRef, useState, type FormEvent } from 'react';
import { createTask } from '../../api/api';
import type { updateTasks } from '../../types/interface';
import { validationTask } from '../../utils/validationTask';

function AddFieldForm({ updateTasks }: updateTasks) {
    const [errorText, setErrorText] = useState<string>('');
    const input = useRef<HTMLInputElement>(null)

    async function createTaskSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const title = input.current?.value.trim() ?? ''

        await validationTask({
            event,
            title,
            setErrorText,
            updateTasks,
            createTask
        })
    }

    return (
        <>
            <form onSubmit={createTaskSubmit}>
                <div className={classes.wrapper}>
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
                    <button className={classes.add}>Добавить</button>
                </div>
            </form>
            {errorText ? <p className={classes.error}>{errorText}</p> : ''}
        </>

    );
}

export default AddFieldForm;


