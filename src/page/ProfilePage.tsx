import { Avatar, Card, Descriptions, type DescriptionsProps, Breadcrumb, Spin, Flex, Tag } from 'antd';
import { useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectProfileUser } from '../store/auth/selectors';
import { loadProfileUserAuth } from '../store/apiThunk';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function ProfilePage() {
  const dispatch = useAppDispatch()
  const { data, status: listStatus } = useAppSelector(selectProfileUser)
  const roles = data?.roles
  const date = new Date(data?.date ?? '').toLocaleString()
  const isDateValid = dayjs(date, 'DD.MM.YYYY, HH:mm:ss', true).isValid()

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Имя пользователя',
      children: data?.username,
    },
    {
      key: '2',
      label: 'Телефон',
      children: data?.phoneNumber,
    },
    {
      key: '3',
      label: 'Email',
      children: data?.email,
    },
    {
      key: '4',
      label: 'Дата регистрации',
      children: isDateValid ? date : `Что-то с датой не так ${isDateValid}`,
    }
  ];

  useEffect(() => {

    dispatch(loadProfileUserAuth())

  }, [])

  return (

    <Flex vertical style={{ margin: '0 16px', }}>
      {listStatus.isLoading ?
        <Spin style={{ margin: '0 auto' }} size="large" /> :

        <Card style={{ width: '100%', height: '90dvh' }}>
          <Breadcrumb style={{ margin: '16px 0', fontSize: '1.5rem' }} items={[{ title: 'Профиль' }]} />
          <Flex vertical style={{ textAlign: 'center' }}>
            <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" style={{ display: 'block', margin: '0 auto' }} />
            <Title level={2} style={{ display: 'block', marginTop: '0.5rem' }}>{data?.username}</Title>
            <Flex justify='center'>
              {roles?.map((role) => {
                return <Tag key={role} color={'success'} style={{ display: 'block', width: "10rem", marginTop: '0.5rem', textAlign: 'center' }}> {role} </Tag>
              })}
            </Flex>
          </Flex>

          <Descriptions style={{ margin: '2rem' }} layout="vertical" bordered={true} items={items} />
        </Card>

      }


    </Flex>

  );
}

export default ProfilePage;