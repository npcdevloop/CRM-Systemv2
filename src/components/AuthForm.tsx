import { Typography, Flex, Image, Form, type FormProps, Input, Checkbox, Button, Layout, Grid, ConfigProvider, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { authUser, registrationUser } from "../api/api";
import type { UserRegistration } from "../types/interface_user";
import InputMask from "antd-mask-input";
import { setAccessToken } from "../utils/auth";
import { setAuth } from "../store/auth/Slices/slice";
import type { NotificationType } from "../types/interface";
import { useAppDispatch } from "../store/hooks";
import { AxiosError } from "axios";


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
  const dispatch = useAppDispatch()
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, error: unknown, pauseOnHover: boolean) => {
    api[type]({
      message: 'Уведомление!',
      description:
        `${error}`,
      showProgress: true,
      pauseOnHover,
    });
  };

  const isRegister = searchParams.get('mode') === 'signup'
  const phoneMask = '+00000000000';

  const onFinish: FormProps<UserRegistration>['onFinish'] = async ({ login, username, email, phoneNumber, password }) => {
    try {

      if (isRegister) {

        try {
          await registrationUser(email, login, password, phoneNumber, username)
          openNotificationWithIcon('success', 'Регистрация прошла успешно! Авторизируйтесь!', true)
          navigate('/auth?mode=login')
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
              openNotificationWithIcon('error', `Ошибка при регистрации! Такой пользователь уже существует!`, true)
            } else {
              openNotificationWithIcon('error', `Ошибка при регистрации! Что-то пошло не так!`, true)
            }
          }
        }

      } else {

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

      }

    } catch {
      openNotificationWithIcon('error', "Произошло что-то непредвиденное! Попробуйте повторить снова!", true)
    }


  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    openNotificationWithIcon('error', `Произошла ошибка при ${isRegister ? 'регистрации' : 'авторизации'}!`, true)
  };

  return (
    <>

      {contextHolder}
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
                    colorPrimaryHover: '#722252ff',
                    colorPrimaryActive: '#722252ff',
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
                  >
                    <InputMask
                      mask={phoneMask}
                    />

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
    </>
  );
}

export default AuthForm;