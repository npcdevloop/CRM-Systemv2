import { useState } from 'react';
import type { updateTasks, Todo, FieldType } from '../types/interface'
import { Button, List, Checkbox, Input, Form, Typography, type FormProps, Flex } from 'antd'
import { CloseOutlined, DeleteOutlined, FormOutlined, SaveOutlined } from '@ant-design/icons'
import { deleteTask, updateTaskByDoneFlag, updateTaskTitle } from '../api/api';



function Task({ id, title, created, isDone, updateTasks }: Todo & updateTasks) {
    const [edit, setEdit] = useState(false)
    const { Text } = Typography;

    function activeEditHandler() {
        setEdit(true)
    }

    function cancelEditHandler() {
        setEdit(false)
    }

    async function deleteHandler() {
        await deleteTask(id)
        await updateTasks()
    }

    const handleSubmit: FormProps<FieldType>['onFinish'] = async ({ title }) => {
        await updateTaskTitle(id, title)
        await updateTasks()
        setEdit(false)
    };

    async function handleChecked(event: { target: { checked: boolean; }; }) {
        await updateTaskByDoneFlag(id, event.target.checked)
        await updateTasks()
    }

    return (
        <List.Item key={id}>

            <Checkbox onChange={handleChecked} checked={isDone} />

            {edit ?
                <Form
                    name="titleEdit"
                    onFinish={handleSubmit}
                    style={{ width: '100%' }}
                >
                    <Flex align='center' justify='space-between'>
                        <Form.Item<FieldType>
                            style={{ marginBottom: 0, margin: '0 auto' }}
                            name="title"
                            initialValue={title}
                            rules={
                                [
                                    {
                                        whitespace: true,
                                        required: true,
                                        message: 'Пожалуйста, введите название задачи! Минимум 2, максимум 64 символа!',
                                        min: 2,
                                        max: 64
                                    },
                                ]
                            }
                        >
                            <Input
                                type="text"
                                style={{ textAlign: 'center' }}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Flex gap='small' >
                                <Button type="primary" htmlType='submit' onClick={() => handleSubmit}>
                                    <SaveOutlined />
                                </Button>
                                <Button type="primary" danger onClick={cancelEditHandler}>
                                    <CloseOutlined />
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Flex>
                </Form>

                :
                <>
                    <Text strong>{title}</Text>
                    <Flex gap="small">
                        <Button type="primary" onClick={activeEditHandler}>
                            <FormOutlined />
                        </Button>
                        <Button type="primary" danger onClick={deleteHandler}>
                            <DeleteOutlined />
                        </Button>
                    </Flex>
                </>
            }
            <meta name="Дата" content={created} />
        </List.Item>
    );
}

export default Task;
