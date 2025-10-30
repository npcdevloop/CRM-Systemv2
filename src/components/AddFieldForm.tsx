import { Button, Input, Flex, Form } from 'antd';
import type { FormProps } from 'antd';
import type { updateTasks, FieldType } from '../types/interface';
import { createTask } from '../api/api';

function AddFieldForm({ updateTasks }: updateTasks) {

    const onFinish: FormProps<FieldType>['onFinish'] = async ({ title }) => {
        await createTask(title)
        await updateTasks()
    };

    return (
        <Form
            method={"POST"}
            name="title"
            onFinish={onFinish}
            variant="underlined"
            style={{ width: "100%", marginBottom: 0 }}
        >
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
                        }}>
                        Добавить
                    </Button>
                </Form.Item>
            </Flex>
        </Form>
    );
}

export default AddFieldForm;


