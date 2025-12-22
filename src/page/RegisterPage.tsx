import { Typography, Flex, Image, Form, type FormProps, Input, Button, ConfigProvider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { registrationUser } from "../api/api";
import type { UserRegistration } from "../types/user";
import InputMask from "antd-mask-input";
import { AxiosError } from "axios";
import useNotification from '../hooks/useNotification';


type FieldType = {
  email?: string;
  username?: string;
  login?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  remember?: string;
};

const { Title, Text } = Typography;

function RegisterPage() {
  const navigate = useNavigate();
  const { contextHolder, openNotificationWithIcon } = useNotification()
  const phoneMask = '+00000000000';

  const onRegister: FormProps<UserRegistration>['onFinish'] = async ({ login, username, email, phoneNumber, password }) => {
    try {
      await registrationUser(email, login, password, phoneNumber, username)
      openNotificationWithIcon('success', 'Регистрация прошла успешно! Авторизируйтесь!', true)
      navigate('/auth')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          openNotificationWithIcon('error', `Ошибка при регистрации! Такой пользователь уже существует!`, true)
        } else {
          openNotificationWithIcon('error', `Ошибка при регистрации! Что-то пошло не так!`, true)
        }
      }
    }
  };

  const onRegisterFailed: FormProps<UserRegistration>['onFinishFailed'] = () => {
    openNotificationWithIcon('error', `Произошла ошибка при регистрации!`, true)
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
            paddingTop: '2rem'
          }
        }
        initialValues={{ remember: true }}
        onFinish={onRegister}
        onFinishFailed={onRegisterFailed}
        autoComplete="off"
        requiredMark={false}
      >

        <Image
          preview={false}
          width='17%'
          src="loginLogo.png"
        />

        <div style={
          { margin: '1rem 0', textAlign: 'left' }
        }>
          <Title level={1} style={{ margin: '0.8rem 0', color: '#525252' }}>Зарегистрируйте свою учетную запись </Title>
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

          <Form.Item<FieldType>
            label="Телефон"
            name="phoneNumber"
          >
            <InputMask
              mask={phoneMask}
            />

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

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </ConfigProvider>

        <Flex justify="center" gap={'0.4rem'} style={
          { marginTop: '0' }
        }>
          <Text style={{ color: '#828282' }}>Зарегистрировались?</Text>
          <NavLink to='/auth' style={{ color: '#7F265B', fontWeight: '600' }}>Войдите в аккаунт!</NavLink>
        </Flex>
      </Form>
    </>
  );
}

export default RegisterPage;