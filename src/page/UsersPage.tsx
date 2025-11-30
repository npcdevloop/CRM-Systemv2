import { Breadcrumb, Button, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { Space, Table, Tag } from 'antd';
import type { TableProps, GetProps } from 'antd';
import { ArrowRightOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { Profile } from "../types/interface_user";

type SearchProps = GetProps<typeof Input.Search>;

interface Users extends Profile {
  key: React.Key;
}


function compareByAlph(a: string | number, b: string | number) {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
}

const columns: TableProps<Users>['columns'] = [
  {
    title: 'Имя',
    dataIndex: 'username',
    key: 'username',
    sorter: (a, b) => compareByAlph(a.username, b.username),
    sortDirections: ['descend'],
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => compareByAlph(a.email, b.email),
    sortDirections: ['descend'],
    key: 'email',
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
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button color="default" variant="outlined">
          {record.isBlocked ? 'Разблок' : 'Блок'}
        </Button>
        <Button color="default" variant="outlined">
          <ArrowRightOutlined />
        </Button>
        <Button color="default" variant="outlined">
          <MoreOutlined />
        </Button>
      </Space>
    ),
  },
];

const data: Users[] = [
  {
    key: '1',
    id: 1,
    username: 'John Brown',
    email: 'test@test.ru',
    phoneNumber: '8-800-555-3535',
    isBlocked: true,
    date: '11.11.11',
    roles: ['USER'],
  },
  {
    key: '2',
    id: 2,
    username: 'Jim Green',
    email: 'gelii@gelii.ru',
    phoneNumber: '8-800-555-3535',
    isBlocked: true,
    date: '11.11.11',
    roles: ['ADMIN'],
  },
  {
    key: '3',
    id: 3,
    username: 'Aoe Black',
    email: 'aenus@genus.com',
    phoneNumber: '8-800-555-3535',
    isBlocked: false,
    date: '11.11.11',
    roles: ['MODERATOR'],
  },
];

const rowSelection: TableProps<Users>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Users[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: Users) => ({
    disabled: record.username === 'Disabled User', // Column configuration not to be checked
    name: record.username,
  }),
};


function UsersPage() {
  const [dataSource, setDataSource] = useState(data);

  const onSearch: SearchProps['onChange'] = (event) => {
    const searchValue = event.target.value;
    const searchData = data.filter(item => {
      if (searchValue.includes('@')) {
        const email = item.email.toLowerCase();
        return email.includes(searchValue)
      } else {
        const name = item.username.toLowerCase()
        return name.includes(searchValue)
      }
    });
    setDataSource(searchData);
  }

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0', fontSize: '1.5rem' }} items={[{ title: 'Пользователи' }]} />
      <div
        style={{
          padding: 16,
          minHeight: '90dvh',
          background: '#fff',
        }}
      >
        <Input placeholder="Поиск по имени или email" onChange={onSearch} />
        <Table<Users>
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </Content>
  );
}

export default UsersPage;