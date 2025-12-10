import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography, type FormProps, notification } from "antd";
import type { User, UserRequest } from "../types/interface_admin";
import InputMask from "antd-mask-input";
import { useState } from "react";
import type { NotificationType } from "../types/interface";
import { useAppDispatch } from "../store/hooks";
import { updateUserDataAdmin } from "../store/apiThunk";

type itemName = "email" | "username" | "phoneNumber"

interface IDescriptionsItem {
  data: User | null,
  id: number,
  itemName: itemName
}

type FieldType = {
  email?: string;
  username?: string;
  phoneNumber?: string;
};

function DescriptionsItem({ data, id, itemName }: IDescriptionsItem) {
  const { Text } = Typography
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const [edit, setEdit] = useState<boolean>(false);
  const phoneMask = '+00000000000';
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, error: unknown, pauseOnHover: boolean) => {
    api[type]({
      message: 'Уведомление!',
      description:
        `${error}`,
      showProgress: true,
      pauseOnHover,
    });
  };

  const onSaveEditData: FormProps<UserRequest>['onFinish'] = async ({ email, username, phoneNumber }) => {
    try {
      await dispatch(updateUserDataAdmin({ id, username, email, phoneNumber }))
      openNotificationWithIcon('success', `Данные успешно изменены!`, true)
    } catch (error) {
      if (error instanceof Error) {
        openNotificationWithIcon('error', `Ошибка при изменении данных пользователя!`, true)
      }
    }
  }

  return (
    <Form
      form={form}
      onFinish={onSaveEditData}
      layout="horizontal"
    >
      {contextHolder}
      <Flex gap="1rem" style={{ flexDirection: "row" }}>
        {edit ?
          <>
            {(itemName === 'phoneNumber') ?
              <Form.Item<FieldType>
                name={'phoneNumber'}
              >
                <InputMask
                  mask={phoneMask}
                />

              </Form.Item>
              :
              <Form.Item<FieldType>
                style={{ width: "100%" }}
                name={itemName}
                initialValue={data ? data[itemName] : undefined}
                rules={[{
                  whitespace: true,
                  min: 1,
                  max: 60,
                }]}>
                <Input placeholder="Админ админит" />
              </Form.Item>
            }

            <Form.Item style={{ marginBottom: 0 }}>
              <Flex gap='small' >
                <Button htmlType='submit' onClick={() => { setEdit(!edit); form.submit() }}>
                  <SaveOutlined />
                </Button>
                <Button type="primary" danger onClick={() => setEdit(!edit)}>
                  <CloseOutlined />
                </Button>
              </Flex>
            </Form.Item>
          </>
          :
          <>
            <Text style={{ width: "100%" }}>{data ? data[itemName] : undefined}</Text>
            <Button onClick={() => setEdit(!edit)}><EditOutlined /></Button>
          </>
        }
      </Flex>
    </Form>
  );
}

export default DescriptionsItem;