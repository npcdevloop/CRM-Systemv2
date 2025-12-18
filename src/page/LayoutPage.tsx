
import { useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { MenuInfo } from "rc-menu/lib/interface";
import { selectProfileUser } from "../store/auth/selectors";
import { useAppSelector } from "../store/hooks";
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/', label: 'Список задач', icon: <UnorderedListOutlined /> },
  { key: '/profile', label: 'Профиль', icon: <UserOutlined /> },
  { key: '/users', label: 'Пользователи', icon: <UserOutlined /> },
];

const userItems: MenuItem[] = [
  { key: '/', label: 'Список задач', icon: <UnorderedListOutlined /> },
  { key: '/profile', label: 'Профиль', icon: <UserOutlined /> },
];

function LayoutPage() {
  const response = useAppSelector(selectProfileUser)
  const roles = response?.data?.roles
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation()

  const onSelectItemMenu = async ({ key }: MenuInfo) => {
    navigate(key)
  }

  return (

    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={pathname !== '/' ? [pathname] : ['/']}
          mode="inline"
          items={
            (roles?.length === 1 && roles.includes('USER')) ? userItems : items
          }
          onClick={onSelectItemMenu}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '1rem' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>

  );
}

export default LayoutPage;