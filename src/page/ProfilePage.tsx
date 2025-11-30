import { Avatar, Card, Descriptions, type DescriptionsProps, Breadcrumb, Spin, Flex, Tag } from 'antd';
import { loadUserProfile } from '../api/api';
import { useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/auth-slice';
import type { Profile } from '../types/interface_user';

interface AuthState extends Profile {
  auth: {
    user: Profile
  }
}

function ProfilePage() {
  const dispatch = useDispatch()
  const user: Profile = useSelector((state: AuthState) => state.auth.user)
  const [loading, setLoading] = useState<boolean>(false)

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Имя пользователя',
      children: user?.username,
    },
    {
      key: '2',
      label: 'Телефон',
      children: user?.phoneNumber,
    },
    {
      key: '3',
      label: 'Дата регистрации',
      children: new Date(user?.date ?? '').toLocaleString(),
    }
  ];

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true)
        const data = await loadUserProfile()
        dispatch(setUser(data))
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    loadProfileData()
  }, [])

  return (

    <Flex vertical style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0', fontSize: '1.5rem' }} items={[{ title: 'Профиль' }]} />
      {loading ?
        <Spin style={{ margin: '0 auto' }} size="large" /> :

        <Card style={{ width: '100%', height: '90dvh' }}>
          <Flex vertical style={{ textAlign: 'center' }}>
            <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" style={{ display: 'block', margin: '0 auto' }} />
            <Title level={2} style={{ display: 'block', marginTop: '0.5rem' }}>{user?.username}</Title>
            <Tag key={user?.id} color={'success'} style={{ display: 'block', marginTop: '0.5rem', textAlign: 'center' }}> {user?.roles} </Tag>
          </Flex>

          <Descriptions style={{ margin: '2rem' }} layout="vertical" bordered={true} items={items} />
        </Card>

      }


    </Flex>

  );
}

export default ProfilePage;