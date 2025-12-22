import { Flex, Image, Layout, Grid } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";

const { useBreakpoint } = Grid;

const contentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '0 1rem 1rem 0',
};

const siderStyle: React.CSSProperties = {
  borderRadius: "3% 0 0 3%",
  backgroundColor: '#fff',
}

const layoutStyle: React.CSSProperties = {
  flexDirection: "column",
  padding: '1rem',
  minHeight: '100dvh',
  backgroundColor: '#ffffffff',
};


function AuthLayoutPage() {
  const { lg } = useBreakpoint()

  return (
    <Layout style={layoutStyle} >
      <Flex>
        {lg &&
          <Sider width='50%' style={siderStyle}>
            <Image
              preview={false}
              height='100%'
              src="loginCover.png"
              style={{ borderRadius: "3% 0 0 3%", objectFit: 'cover' }}
            />
          </Sider>}

        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Flex>
    </Layout >
  );
}

export default AuthLayoutPage;