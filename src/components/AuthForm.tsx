import { Typography, Flex, Image, Form, type FormProps, Input, Checkbox, Button, Layout, Grid, ConfigProvider, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { authUser, registrationUser } from "../api/api";
import { setToken } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import type { UserRegistration } from "../types/interface_user";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

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


function AuthForm() {
  const { lg } = useBreakpoint()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const isRegister = searchParams.get('mode') === 'signup'
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, error: unknown) => {
    api[type]({
      message: 'Ошибка!',
      description:
        `${error}`,
    });
  };


  const onFinish: FormProps<UserRegistration>['onFinish'] = async ({ login, username, email, phoneNumber, password }) => {
    try {

      if (isRegister) {
        await registrationUser(email, login, password, phoneNumber, username)
        openNotificationWithIcon('success', 'Регистрация прошла успешно! Авторизируйтесь!')
        navigate('/auth?mode=login')
      }

      if (!isRegister) {
        const { refreshToken, accessToken } = await authUser(login, password)
        localStorage.setItem('refreshToken', refreshToken)
        dispatch(setToken(accessToken))
        openNotificationWithIcon('success', 'Авторизация прошла успешно!')
        navigate('/')
      }

    } catch (error) {
      openNotificationWithIcon('error', error)
    }


  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    openNotificationWithIcon('error', `Произошла ошибка при ${isRegister ? 'регистрации' : 'авторизации'}!`)
  };



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
          <Form
            name="basic"
            layout={"vertical"}
            style={
              isRegister ?
                {
                  margin: '0 auto',
                  maxWidth: '26.3rem',
                  paddingTop: '2rem'
                }
                :
                {
                  margin: '0 auto',
                  maxWidth: '26.3rem',
                  paddingTop: '10.2rem'
                }
            }
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            {contextHolder}
            <Image
              preview={false}
              width='17%'
              src="loginLogo.png"
            />

            <div style={isRegister ?
              { margin: '1rem 0', textAlign: 'left' }
              :
              { margin: '2.25rem 1.15rem', textAlign: 'left' }
            }>
              <Title level={1} style={{ margin: '0.8rem 0', color: '#525252' }}> {isRegister ? 'Зарегистрируйте свою учетную запись' : 'Войдите в свою учетную запись'} </Title>
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
                  colorPrimaryHover: '#722252ff'
                }
              },
            }}>
              {isRegister &&
                <Form.Item<FieldType>
                  label="Имя пользователя"
                  name="username"
                  rules={[{
                    whitespace: true,
                    min: 1,
                    max: 60,
                    required: true,
                    message: 'Пожалуйста, введите свое Имя!'
                  }]}

                >
                  <Input placeholder="Иванов Иван" />
                </Form.Item>
              }


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


              {isRegister &&
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[{
                    whitespace: true,
                    required: true,
                    type: "email",
                    message: 'Пожалуйста, введите свой email!'
                  }]}

                >
                  <Input placeholder="mail@abc.com" />
                </Form.Item>
              }

              {isRegister &&
                <Form.Item<FieldType>
                  label="Телефон"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите свой телефон!"
                    },
                    {
                      pattern: /^\+?[1-9]\d{1,14}$/,
                      message: "Введите номер в международном формате (например, +7...)"
                    }
                  ]}


                >
                  <Input placeholder="+7 (800) 555-35-35" />
                </Form.Item>
              }

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

              {isRegister &&
                <Form.Item<FieldType>
                  label="Подтвердите пароль"
                  name="confirmPassword"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Минимальное количество символов 6!',
                      min: 6,
                      max: 60,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароль, который вы ввели, не соответствует!'));
                      },
                    }),
                  ]}

                >
                  <Input.Password placeholder="*****************" />
                </Form.Item>
              }
              {!isRegister &&
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
              }


              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  {isRegister ? 'Зарегистрироваться' : "Войти"}
                </Button>
              </Form.Item>
            </ConfigProvider>

            <Flex justify="center" gap={'0.4rem'} style={
              isRegister ?
                { marginTop: '0' }
                :
                { marginTop: '16dvh' }
            }>
              <Text style={{ color: '#828282' }}>{isRegister ? 'Зарегистрировались?' : "Еще не зарегистрировались?"}</Text>
              <NavLink to={isRegister ? '/auth?mode=login' : "/auth?mode=signup"} style={{ color: '#7F265B', fontWeight: '600' }}>{isRegister ? 'Войдите в аккаунт' : "Создайте аккаунт!"}</NavLink>
            </Flex>
          </Form>
        </Content>
      </Flex>
    </Layout >
  );
}

export default AuthForm;