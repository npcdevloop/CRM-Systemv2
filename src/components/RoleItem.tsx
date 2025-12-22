import { CloseOutlined, EditOutlined, EyeOutlined, PlusOutlined, RubyOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Form, type FormProps, message, Popconfirm, Tag, theme } from "antd";
import type { Roles, UserRolesRequest } from "../types/admin";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { updateUserRightsAdmin } from "../store/apiThunk";
import React from "react";
import type { Role } from "../types/user";
import useNotification from "../hooks/useNotification";

interface IDescriptionsItem {
  id: number,
  rolesServer: Roles[],
}

const isRole = (role: string): role is Role => {
  return ["ADMIN", "USER", "MODERATOR"].includes(role);
}
const toRoles = (role: string): Roles | null => {
  if (isRole(role)) {
    return role as Roles;
  }
  return null;
}

function RoleItem({ rolesServer, id }: IDescriptionsItem) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const { useToken } = theme;
  const { token } = useToken();
  const [, holder] = message.useMessage();
  const [edit, setEdit] = useState<boolean>(false);
  const [roles, setRoles] = useState<Roles[]>(rolesServer)
  const [rights, setRights] = useState<Role>()
  const { contextHolder, openNotificationWithIcon } = useNotification()

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const onSaveEditData: FormProps<UserRolesRequest>['onFinish'] = async () => {
    try {
      await dispatch(updateUserRightsAdmin({ id, roles }))
      openNotificationWithIcon('success', `Данные успешно изменены!`, true)
    } catch (error) {
      if (error instanceof Error) {
        openNotificationWithIcon('error', `Ошибка при изменении данных пользователя!`, true)
      }
    }
  }

  const onAddRightsUser = (rights: Role) => {
    if (isRole(rights)) {
      const rol = toRoles(rights)
      if (!rol) {
        return
      }
      if (roles.includes(rol)) {
        openNotificationWithIcon('error', `У пользователя уже есть такой статус!`, true)
      } else {
        const newRoles = [...Object.values(roles), rol]
        setRoles(newRoles)
        openNotificationWithIcon("success", `Статус ${rol} был добавлен! Данные обновляться только при сохранении!`, true)
      }
    }
  }

  const onDeleteRightsUser = (rl: Role) => {
    if (roles.length === 1) {
      return openNotificationWithIcon("warning", `Нельзя оставить пользователя без статуса!`, true)
    }
    const newRoles = roles.filter((role) => {
      if (role !== rl) {
        return role
      }
    })
    setRoles(newRoles)
    openNotificationWithIcon("warning", `Статус пользователя ${rl} был удален! Данные обновляться только при сохранении!`, true)
  }


  useEffect(() => {
    setRoles(rolesServer)
  }, [rolesServer])

  return (
    <Form
      form={form}
      onFinish={onSaveEditData}
      layout="horizontal"
    >
      {contextHolder}
      <Flex gap="1rem" style={{ flexDirection: "row" }}>
        {edit ?

          <Form.Item style={{ margin: "0 auto", marginBottom: 0 }}>

            <Flex gap='small' >

              <Flex style={{ margin: "0 auto" }} gap="1rem">
                {roles?.map((rl) => {
                  return <Flex justify="center" align="center">
                    <Tag key={rl} color={'success'} style={{ display: 'block', width: "10rem", textAlign: 'center', marginInlineEnd: "2px" }}> {rl} </Tag>
                    <Button danger size="small" style={{ height: '24px' }} onClick={() => onDeleteRightsUser(rl)}><CloseOutlined /></Button>
                  </Flex>
                })}
              </Flex>

              <Dropdown
                popupRender={() => (
                  <div style={contentStyle}>
                    <>
                      {holder}
                      <Popconfirm
                        title="Добавление роли"
                        description="Вы уверены, что хотите дать эти права пользователю?"
                        onConfirm={() => onAddRightsUser(rights ?? 'USER')}
                        okText="Да"
                        cancelText="Нет"
                      >
                        <Flex vertical>
                          <Button style={{ borderRadius: 0 }} onClick={() => setRights("USER")}><UserOutlined />USER</Button>
                          <Button style={{ borderRadius: 0 }} onClick={() => setRights("MODERATOR")}><EyeOutlined />MODERATOR</Button>
                          <Button style={{ borderRadius: 0 }} onClick={() => setRights("ADMIN")}><RubyOutlined /> ADMIN</Button>
                        </Flex>

                      </Popconfirm>
                    </>

                  </div>
                )}
                trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Button>
                    <PlusOutlined />
                  </Button>
                </a>
              </Dropdown>
              <Button htmlType='submit' onClick={() => { setEdit(!edit); form.submit() }}>
                <SaveOutlined />
              </Button>
              <Button type="primary" danger onClick={() => setEdit(!edit)}>
                <CloseOutlined />
              </Button>

            </Flex>

          </Form.Item>

          :
          <Flex style={{ margin: "0 auto" }}>
            {rolesServer?.map((role) => {
              return <Tag key={role} color={'success'} style={{ display: 'block', width: "10rem", marginTop: '0.5rem', textAlign: 'center' }}> {role} </Tag>
            })}
            <Button onClick={() => setEdit(!edit)}><EditOutlined /></Button>
          </Flex>
        }
      </Flex>
    </Form>
  );
}

export default RoleItem;