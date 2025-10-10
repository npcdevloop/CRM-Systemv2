
import { Form, type HTMLFormMethod } from 'react-router-dom';
import classes from './AddFieldForm.module.css'



function AddFieldForm({ method }: { method: HTMLFormMethod }) {
    return (
        <Form method={method}>
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
                        required
                    />
                </li>
                <li>
                    <button className={classes.add}>Add</button>
                </li>
            </ul>
        </Form>
    );
}

export default AddFieldForm;


export async function Action({ request }: { request: Request }) {
    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        isDone: data.get('isDone'),
    }

    const response = await fetch('https://easydev.club/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
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