import { useState } from 'react';
import type { Todo, MetaResponse, TodoInfo } from '../types/interface'
import { Button, List, Checkbox, Input, Form, Typography, type FormProps, Flex } from 'antd'
import { CloseOutlined, DeleteOutlined, FormOutlined, SaveOutlined } from '@ant-design/icons'
import { deleteTask, updateTaskState } from '../api/api';

interface updateTasks {
  updateTasks: () => Promise<MetaResponse<Todo, TodoInfo>> | Promise<void>
}

type FieldType = {
  title: string;
};

function Task({ id, title, created, isDone, updateTasks }: Todo & updateTasks) {
  const [edit, setEdit] = useState<boolean>(false)
  const { Text } = Typography;

  function onActiveEditStateTask() {
    setEdit(true)
  }

  function onCancelEditStateTask() {
    setEdit(false)
  }

  async function onDeleteTask() {
    try {

      await deleteTask(id)
      await updateTasks()
    } catch (error) {
      throw new Error(`Ошибка при удалении задачи:\n${error}`)
    }

  }

  const onSaveEditTask: FormProps<FieldType>['onFinish'] = async ({ title }) => {
    try {
      await updateTaskState(id, { title: title })
      await updateTasks()
      setEdit(false)
    } catch (error) {
      throw new Error(`Ошибка при обновлении заголовка задачи:\n${error}`)
    }
  };

  async function onCompletedTask(event: { target: { checked: boolean; }; }) {
    try {
      await updateTaskState(id, { isDone: event.target.checked })
      await updateTasks()
    } catch (error) {
      throw new Error(`Ошибка при обновлении готовности задачи:\n${error}`)
    }
  }

  return (
    <List.Item key={id}>

      <Checkbox onChange={onCompletedTask} checked={isDone} />

      {edit ?
        <Form
          name="titleEdit"
          onFinish={onSaveEditTask}
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
                <Button type="primary" htmlType='submit'>
                  <SaveOutlined />
                </Button>
                <Button type="primary" danger onClick={onCancelEditStateTask}>
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
            <Button type="primary" onClick={onActiveEditStateTask}>
              <FormOutlined />
            </Button>
            <Button type="primary" danger onClick={onDeleteTask}>
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
