import { Typography, Flex, Image, Form, type FormProps, Input, Checkbox, Button, ConfigProvider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { authUser } from "../api/api";
import type { AuthData } from "../types/user";
import { setAccessToken } from "../utils/auth";
import { setAuth } from "../store/auth/Slices/slice";
import { useAppDispatch } from "../store/hooks";
import { AxiosError } from "axios";
import useNotification from "../hooks/useNotification";

type FieldType = {
  email?: string;
  username?: string;
  login?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  remember?: string;
};

const { Title, Text, Link } = Typography;

function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { contextHolder, openNotificationWithIcon } = useNotification()

  const onAuth: FormProps<AuthData>['onFinish'] = async ({ login, password }) => {
    try {
      const { refreshToken, accessToken } = await authUser(login, password)
      openNotificationWithIcon('success', 'Авторизация прошла успешно!', true)
      localStorage.setItem('refreshToken', refreshToken)
      setAccessToken(accessToken)
      dispatch(setAuth(true))
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          openNotificationWithIcon('error', `Ошибка при авторизации! Неверно введены данные!`, true)
        }
      }
    }
  };

  const onAuthFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    openNotificationWithIcon('error', `Произошла ошибка при авторизации!`, true)
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        layout={"vertical"}
        style={
          {
            margin: '0 auto',
            maxWidth: '26.3rem',
            paddingTop: '10.2rem'
          }
        }
        initialValues={{ remember: true }}
        onFinish={onAuth}
        onFinishFailed={onAuthFailed}
        autoComplete="off"
        requiredMark={false}
      >

        <Image
          preview={false}
          width='17%'
          src="loginLogo.png"
        />

        <div style={
          { margin: '2.25rem 1.15rem', textAlign: 'left' }
        }>
          <Title level={1} style={{ margin: '0.8rem 0', color: '#525252' }}>Войдите в свою учетную запись</Title>
          <Text style={{ color: '#525252' }}>Посмотрите, что происходит с вашим бизнесом</Text>
        </div>

        <ConfigProvider theme={{
          components: {
            Form: {
              labelColor: '#828282'
            },
            Checkbox: {
              colorPrimary: '#7F265B',
              colorPrimaryHover: '#722252ff'
            },
            Button: {
              colorPrimary: '#7F265B',
              colorPrimaryHover: '#722252ff',
              colorPrimaryActive: '#722252ff',
            }
          },
        }}>

          <Form.Item<FieldType>
            label="Логин"
            name="login"
            rules={[{
              whitespace: true,
              min: 2,
              max: 60,
              required: true,
              message: 'Пожалуйста, введите свой логин!'
            }]}

          >
            <Input placeholder="abrakadabra134" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{
              whitespace: true,
              min: 6,
              max: 60,
              required: true, message: 'Минимальное количество символов 6!'
            }]}
          >
            <Input.Password placeholder="*****************" autoComplete="off" />
          </Form.Item>


          <Flex justify="space-between">
            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox style={{ color: '#A1A1A1' }}>Запомнить меня</Checkbox>
            </Form.Item>
            <Form.Item label={null}>
              <Link style={{ color: '#7F265B', fontWeight: 600 }}>
                Забыли пароль?
              </Link>
            </Form.Item>
          </Flex>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              "Войти"
            </Button>
          </Form.Item>
        </ConfigProvider>

        <Flex justify="center" gap={'0.4rem'} style={
          { marginTop: '16dvh' }
        }>
          <Text style={{ color: '#828282' }}>Еще не зарегистрировались?</Text>
          <NavLink to='/register' style={{ color: '#7F265B', fontWeight: '600' }}>Создайте аккаунт!</NavLink>
        </Flex>
      </Form>
    </>
  );
}

export default AuthPage;