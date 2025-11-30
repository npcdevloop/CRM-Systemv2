
import { useState } from "react";
import { Layout, Menu, notification } from "antd";
import type { MenuProps } from 'antd';
import { LogoutOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { MenuInfo } from "rc-menu/lib/interface";
import { logoutUser } from "../api/api";
import { logOut } from "../store/auth-slice";
import { useDispatch } from "react-redux";
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function createItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  createItem('Список задач', '/', <UnorderedListOutlined />),
  createItem('Профиль', '/profile', <UserOutlined />),
  createItem('Пользователи', '/users', <UserOutlined />),
  createItem('Выход', '/logout', <LogoutOutlined />),
];


function LayoutPage() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, error: unknown) => {
    api[type]({
      message: 'Ошибка!',
      description:
        `${error}`,
    });
  };


  async function onSelectItemMenu({ key }: MenuInfo) {
    if (key === '/logout') {
      try {
        navigate('/auth')
        await logoutUser()
        dispatch(logOut())
        localStorage.removeItem('refreshToken')
      } catch (error) {
        openNotificationWithIcon('error', error)
      }
    } else {
      navigate(key)
    }
  }

  return (

    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={pathname !== '/' ? [pathname] : ['/']}
          mode="inline"
          items={items}
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