
import { useRef, useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import type { MenuInfo } from "rc-menu/lib/interface";
import TodoListPage from "./TodoListPage";
import ProfilePage from "./ProfilePage";

const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
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
    getItem('Список задач', '/', <UnorderedListOutlined />),
    getItem('Профиль', '/profile', <UserOutlined />),
];

function LayoutPage() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().pathname
    const delay: number = 5000;
    const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

    function handleSubmit({ key }: MenuInfo) {
        navigate(key)
    }

    function setTimerId(timer: number) {
        timerId.current = timer
    }

    function returnTimerId() {
        const timer = timerId.current
        return timer
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={location !== '/' ? [location] : ['/']} mode="inline" items={items} onClick={handleSubmit} />
            </Sider>
            <Layout>
                <Content style={{ margin: '1rem' }}>
                    {
                        location === '/'
                            ?
                            <TodoListPage delay={delay} setTimerId={setTimerId} returnTimerId={returnTimerId} />
                            :
                            <ProfilePage returnTimerId={returnTimerId} setTimerId={setTimerId} />
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutPage;