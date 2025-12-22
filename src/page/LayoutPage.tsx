
import { useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { MenuInfo } from "rc-menu/lib/interface";
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/', label: 'Список задач', icon: <UnorderedListOutlined /> },
  { key: '/profile', label: 'Профиль', icon: <UserOutlined /> },
];

function LayoutPage() {
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
            items
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