import { Avatar, Card, Descriptions, type DescriptionsProps, Breadcrumb, Spin, Flex, Tag } from 'antd';
import { useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectProfileUser } from '../store/auth/selectors';
import { loadProfileUserAuth } from '../store/apiThunk';


function ProfilePage() {
  const dispatch = useAppDispatch()
  const { data, status: listStatus } = useAppSelector(selectProfileUser)

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
      label: 'Дата регистрации',
      children: new Date(data?.date ?? '').toLocaleString(),
    }
  ];

  useEffect(() => {
    const loadProfileData = async () => {
      dispatch(loadProfileUserAuth())
    }
    loadProfileData()
  }, [])

  return (

    <Flex vertical style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0', fontSize: '1.5rem' }} items={[{ title: 'Профиль' }]} />
      {listStatus.isLoading ?
        <Spin style={{ margin: '0 auto' }} size="large" /> :

        <Card style={{ width: '100%', height: '90dvh' }}>
          <Flex vertical style={{ textAlign: 'center' }}>
            <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" style={{ display: 'block', margin: '0 auto' }} />
            <Title level={2} style={{ display: 'block', marginTop: '0.5rem' }}>{data?.username}</Title>
            <Tag key={data?.id} color={'success'} style={{ display: 'block', marginTop: '0.5rem', textAlign: 'center' }}> {data?.roles} </Tag>
          </Flex>

          <Descriptions style={{ margin: '2rem' }} layout="vertical" bordered={true} items={items} />
        </Card>

      }


    </Flex>

  );
}

export default ProfilePage;