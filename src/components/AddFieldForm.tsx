import { Button, Input, Flex, Form, notification } from 'antd';
import type { FormProps } from 'antd';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTodosTask, fetchTodosByFilter } from '../store/apiThunk';
import { selectTab } from '../store/todo/selectors';
import type { NotificationType } from '../types/interface';

type FieldType = {
  title: string;
};

const AddFieldForm = memo(function AddFieldForm() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector(selectTab)
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, error: unknown) => {
    api[type]({
      message: 'Ошибка!',
      description:
        `${error}`,
    });
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async ({ title }) => {
    try {
      await dispatch(createTodosTask({ title }))
      await dispatch(fetchTodosByFilter(tab))
    } catch (error) {
      openNotificationWithIcon('error', error)
      throw new Error(`Ошибка при создании задачи:\n${error}`)
    }
  };

  return (

    <Form
      method={"POST"}
      name="title"
      onFinish={onFinish}
      variant="underlined"
      style={{ width: "100%", marginBottom: 0 }}
    >
      {contextHolder}
      <Flex align='center' justify="center" gap='middle'>
        <Form.Item<FieldType >
          style={{ width: "100%", marginBottom: 0 }}
          name="title"
          rules={[{
            whitespace: true,
            required: true,
            message: 'Пожалуйста, введите название задачи! Минимум 2, максимум 64 символа!',
            min: 2,
            max: 64
          }]}>
          <Input
            placeholder="Task To Be Done..."
            style={{
              height: "2.5rem"
            }} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 0 }}
        >
          <Button type="primary" htmlType="submit"
            style={{
              width: "7rem",
              height: "2.5rem"
            }}
          >
            Добавить
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}
)
export default AddFieldForm;


