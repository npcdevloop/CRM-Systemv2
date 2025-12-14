
import { useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import { LogoutOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { MenuInfo } from "rc-menu/lib/interface";
import { selectProfileUser } from "../store/auth/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutUserAuth } from "../store/apiThunk";
import useNotification from "../hooks/useNotification";
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const createItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
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

const userItems: MenuItem[] = [
  createItem('Список задач', '/', <UnorderedListOutlined />),
  createItem('Профиль', '/profile', <UserOutlined />),
  createItem('Выход', '/logout', <LogoutOutlined />),
];


function LayoutPage() {
  const dispatch = useAppDispatch()
  const response = useAppSelector(selectProfileUser)
  const roles = response?.data?.roles
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const { contextHolder, openNotificationWithIcon } = useNotification()


  const onSelectItemMenu = async ({ key, domEvent }: MenuInfo) => {
    if (key === '/logout') {
      try {
        dispatch(logoutUserAuth())
        navigate('/auth')
        localStorage.removeItem('refreshToken')
      } catch {
        if (!(domEvent.target instanceof HTMLElement)) {
          return;
        }
        openNotificationWithIcon('error', `Что-то пошло не так! ${domEvent.target.textContent} оказался недоступен!`, true)
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