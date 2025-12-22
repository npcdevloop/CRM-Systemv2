import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography, type FormProps } from "antd";
import type { User, UserRequest } from "../types/admin";
import InputMask from "antd-mask-input";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { updateUserDataAdmin } from "../store/apiThunk";
import useNotification from "../hooks/useNotification";
;

type ItemName = "email" | "username" | "phoneNumber"

interface DescriptionsItem {
  data: User | null,
  id: number,
  itemName: ItemName
}

type FieldType = {
  email?: string;
  username?: string;
  phoneNumber?: string;
};

function DescriptionsItem({ data, id, itemName }: DescriptionsItem) {
  const { Text } = Typography
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const [edit, setEdit] = useState<boolean>(false);
  const phoneMask = '+00000000000';
  const { contextHolder, openNotificationWithIcon } = useNotification()

  const onSaveEditData: FormProps<UserRequest>['onFinish'] = async ({ email, username, phoneNumber }) => {

    if (phoneNumber === '+___________') {
      phoneNumber = phoneMask
    }

    if (phoneNumber && phoneNumber.includes('_')) {

      let count = 0;
      for (let i = 0; i < phoneNumber.length; i++) {
        if (phoneNumber.charAt(i) === '_') {
          count++;
        }
      }

      if (count > 0) {
        openNotificationWithIcon('error', `Длинна телефонного номера слишком мала!`, true)
        return;
      }

    }

    await dispatch(updateUserDataAdmin({ id, username, email, phoneNumber }))
    openNotificationWithIcon('success', `Данные успешно изменены!`, true)

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
                initialValue={data ? data.phoneNumber : undefined}
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
            {(itemName === 'phoneNumber' && data && data.phoneNumber === '+00000000000') ?
              <Text style={{ width: "100%" }}></Text>
              :
              <Text style={{ width: "100%" }}>{data ? data[itemName] : undefined}</Text>
            }

            <Button onClick={() => setEdit(!edit)}><EditOutlined /></Button>
          </>
        }
      </Flex>
    </Form>
  );
}

export default DescriptionsItem;