import { Breadcrumb, Button, Divider, Dropdown, Flex, Input, Switch, theme, Typography, InputNumber, Space, Table, Tag, notification, message, Popconfirm } from "antd";
import type { TableColumnsType, InputNumberProps, MenuProps, InputProps, ButtonProps, PopconfirmProps, TableProps } from 'antd';
import { DeleteOutlined, FilterOutlined, MoreOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import type { Profile } from "../types/interface_user";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUsersRequest } from "../store/admin/selectors";
import { blockUserAdmin, deleteUserAdmin, fetchUsers, unblockUserAdmin } from "../store/apiThunk";
import type { UserFilters } from "../types/interface_admin";
import type { MenuItemType } from "antd/es/menu/interface";
import { deleteUserData, replaceUserData } from "../store/admin/Slices/slice";
import type { MenuInfo } from "rc-menu/lib/interface";
import type { NotificationType } from "../types/interface";
import { selectProfileUser } from "../store/auth/selectors";

function UsersTable() {
  const dispatch = useAppDispatch()

  const usersRequest = useAppSelector(selectUsersRequest)
  const { data: users } = usersRequest

  const profileUser = useAppSelector(selectProfileUser)
  const { data: profile } = profileUser

  const { useToken } = theme;
  const { token } = useToken();
  const { Text } = Typography;

  const [api, contextHolder] = notification.useNotification();
  const [messageApi, holder] = message.useMessage();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [filterParams, setFilterParams] = useState<UserFilters>({
    search: undefined,
    sortBy: undefined,
    sortOrder: "asc",
    isBlocked: undefined,
    limit: undefined,
    page: undefined,
  });

  const openNotificationWithIcon = (type: NotificationType, error: unknown, pauseOnHover: boolean) => {
    api[type]({
      message: 'Уведомление!',
      description:
        `${error}`,
      showProgress: true,
      pauseOnHover,
    });
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const sharedProps = {
    mode: 'spinner' as const,
    defaultValue: undefined,
    style: { width: "9.5rem" },
  };

  const filterItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Сортировать по ',
      children: [
        {
          key: 'email',
          label: 'Email',
        },
        {
          key: 'username',
          label: 'Имени пользователей',
        },
        {
          key: 'id',
          label: 'ID',
        },
      ],
    },
  ];

  const userItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Профиль',
      icon: <UserOutlined />,
    },
  ];

  const columns: TableColumnsType<Profile> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
      fixed: 'left',
    },
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
      fixed: 'left',
      showSorterTooltip: { title: "Сортировка по возрастанию/убыванию", target: "sorter-icon" },
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      showSorterTooltip: { title: "Сортировка по возрастанию/убыванию", target: "sorter-icon" },
      sorter: true,
    },
    {
      title: 'Телефон',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Роли',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            const color = role.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Блокировка',
      key: 'isBlocked',
      dataIndex: 'isBlocked',
      filters: [
        {
          text: 'Dсе пользователи',
          value: 'all',
        },
        {
          text: 'Только заблокированные пользователи',
          value: false,
        },
        {
          text: 'Только активные пользователи',
          value: true,
        },
      ],
      defaultFilteredValue: ['all'],
      filterMultiple: false,
      render: (_, { isBlocked }) => (
        <span>
          {isBlocked ? '+' : '-'}
        </span>
      ),
    },
    {
      title: 'Дата регистр',
      dataIndex: 'date',
      key: 'date',
      render: (_, { date }) => (
        <span>
          {date
            .slice(0, 10)
            .split("-")
            .reverse()
            .join(".")}

        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        (record.id !== profile?.id) ?
          <Space size="middle">
            {record.isBlocked
              ?
              <>
                {holder}
                <Popconfirm
                  title="Разблокировка пользователя"
                  description="Вы уверены, что хотите разблокировать этого пользователя?"
                  onConfirm={() => onUnBlockUser(record.id)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button color="default" variant="outlined">Разблок</Button>
                </Popconfirm>
              </>

              :
              <>
                {holder}
                <Popconfirm
                  title="Блокировка пользователя"
                  description="Вы уверены, что хотите заблокировать этого пользователя?"
                  onConfirm={() => onBlockUser(record.id)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button color="default" variant="outlined">Блок</Button>
                </Popconfirm>
              </>

            }
            <Dropdown
              menu={{ items: userItems, onClick: onSelectItemMenuUser(record.id) }}
              popupRender={(menu) => (

                <div style={contentStyle}>
                  {React.cloneElement(
                    menu as React.ReactElement<{
                      style: React.CSSProperties;
                    }>,
                    { style: menuStyle },
                  )}

                  <>
                    {holder}
                    <Popconfirm
                      title="Удаление пользователя"
                      description="Вы уверены, что хотите удалить этого пользователя?"
                      onConfirm={onDeleteUser(record.id)}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <Button color="danger" variant="solid"> <DeleteOutlined /> Удалить</Button>
                    </Popconfirm>
                  </>

                </div>
              )}
              trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Button color="default" variant="outlined">
                  <MoreOutlined />
                </Button>
              </a>
            </Dropdown>
          </Space>
          :
          <>
            <Dropdown
              menu={{ items: userItems, onClick: onSelectItemMenuUser(record.id) }}
              trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Button color="default" variant="outlined">
                  <MoreOutlined />
                </Button>
              </a>
            </Dropdown>
          </>
      ),
    },
  ];



  const onFilterColumn: TableProps<Profile>['onChange'] = (_, filters, sorter) => {
    if (!Array.isArray(filters) && filters.isBlocked) {
      const value = filters.isBlocked
      const isBlock = (value[0] === 'all') ? undefined : value[0].valueOf()
      if (typeof isBlock === "boolean" || typeof isBlock === "undefined") {
        setFilterParams({ ...filterParams, isBlocked: isBlock })
      }
    }


    if (!Array.isArray(sorter) && sorter.column) {
      const sortOrder = sorter.order === "ascend" ? "asc" : "desc";
      setFilterParams({ ...filterParams, sortBy: (typeof sorter.column?.dataIndex === "string") ? sorter.column?.dataIndex : undefined, sortOrder: sortOrder })
    }
  };

  const onSwitchChange = async (checked: boolean) => {
    const sortOrder = checked ? "asc" : "desc";
    setFilterParams({ ...filterParams, sortOrder: sortOrder })
  }

  const onChangeLimitUsers: InputNumberProps['onChange'] = async (value) => {
    const limitUsersValue = (value === null) ? undefined : Number(value)
    setFilterParams({ ...filterParams, limit: limitUsersValue })

  };

  const onChangePage: InputNumberProps['onChange'] = async (value) => {
    const pageValue = (value === null) ? undefined : Number(value)
    setFilterParams({ ...filterParams, page: pageValue })
  };

  const onSelectItemMenuFilter: MenuItemType['onClick'] = async (e) => {
    if (e.key === filterParams.sortBy) {
      setSelectedKeys([])
      setFilterParams({ ...filterParams, sortBy: undefined })
      updateDataUsers(filterParams)
    } else {
      setSelectedKeys([e.key])
      setFilterParams({ ...filterParams, sortBy: e.key })
    }
  };

  const onDeleteUser = (id: number): PopconfirmProps['onConfirm'] => {
    return async () => {
      try {
        await dispatch(deleteUserAdmin(id));
      } catch (error) {
        openNotificationWithIcon('error', `Ошибка при удалении пользователя! ${error}`, true)
      } finally {
        dispatch(deleteUserData(id))
        messageApi.success('Пользователь был удален!');
      }
    }
  }

  const onSelectItemMenuUser = (id: number): MenuItemType['onClick'] => {
    return async (e: MenuInfo) => {
      if (e.key === 'profile') {
        try {
          window.open(`/admin/users/${id}`)
        } catch (error) {
          if (error instanceof Error) {
            openNotificationWithIcon('error', `Ошибка при загрузке данных пользователя! ${error.message}`, true)
          }
        }
      } else {
        return;
      }
    };
  };

  const onChangeSearchInput: InputProps['onChange'] = (e) => {
    setFilterParams({ ...filterParams, search: e.target.value })
  }

  const onSearch: ButtonProps['onClick'] = async () => {
    await updateDataUsers(filterParams)
  }

  const onBlockUser = async (id: number) => {
    const { payload: user } = await dispatch(blockUserAdmin(id))
    await dispatch(replaceUserData(user))
  }

  const onUnBlockUser = async (id: number) => {
    const { payload: user } = await dispatch(unblockUserAdmin(id))
    await dispatch(replaceUserData(user))
  }

  const updateDataUsers = async (params?: UserFilters) => {
    await dispatch(fetchUsers(params ?? {}))
  }

  useEffect(() => {
    updateDataUsers(filterParams)
  }, [dispatch, filterParams])

  return (
    <>
      {contextHolder}
      <div
        style={{
          padding: "1rem 1rem 0 1rem",
          minHeight: '96dvh',
          background: '#fff',
        }}
      >
        <Breadcrumb style={{ fontSize: '1.5rem' }} items={[{ title: 'Пользователи' }]} />
        <Flex gap={"1.5rem"} style={{ marginBottom: '1rem' }}>
          <Dropdown
            menu={{ items: filterItems, selectable: true, selectedKeys: selectedKeys, onClick: onSelectItemMenuFilter }} trigger={['click']}
            popupRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(
                  menu as React.ReactElement<{
                    style: React.CSSProperties;
                  }>,
                  { style: menuStyle },
                )}
                <Divider style={{ margin: 0 }} />
                <Flex vertical justify="center">
                  <Space style={{ padding: 8 }}>
                    <Flex vertical>
                      <Text style={{ display: "block" }}>Порядок сортировки:</Text>
                      <Switch style={{ marginTop: "0.5rem" }} checkedChildren="A → Я" unCheckedChildren="Я → А" defaultChecked onClick={onSwitchChange} />
                    </Flex>
                  </Space>
                  <Space style={{ padding: 8 }}>
                    <Flex vertical>
                      <Text style={{ display: "block" }}>Лимит пользователей</Text>
                      <Text style={{ display: "block", textAlign: 'center' }}>(Всего {users?.meta.totalAmount})</Text>
                      <InputNumber {...sharedProps} placeholder="По стандарту 20" onChange={onChangeLimitUsers} />
                    </Flex>
                  </Space>
                  <Space style={{ padding: 8 }}>
                    <Flex vertical>
                      <Text style={{ display: "block" }}>Страницу</Text>
                      <InputNumber {...sharedProps} onChange={onChangePage} />
                    </Flex>
                  </Space>
                </Flex>

              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button type="dashed" icon={<FilterOutlined />} size={"large"}>Фильтр</Button>
            </a>
          </Dropdown>
          <Input placeholder="Поиск по имени или email" onChange={onChangeSearchInput} />
          <Button type="primary" icon={<SearchOutlined />} size={"large"} onClick={onSearch}>Поиск</Button>
        </Flex>

        <Table<Profile>
          onChange={onFilterColumn}
          columns={columns}
          dataSource={users?.data || []}
          pagination={{ defaultPageSize: 20 }}
          scroll={{ x: 'max-content', y: 'max-content' }}
        />

      </div >
    </>
  );
}

export default UsersTable;