import { Avatar, Card, Descriptions, type DescriptionsProps, Breadcrumb, Spin, Flex, Typography, Button } from 'antd';
import { useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUser, loadProfileUserAuth } from '../store/apiThunk';
import { selectUserRequest } from '../store/admin/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import DescriptionsItem from './DescriptionsItem';
import { LeftOutlined } from '@ant-design/icons';
import RoleItem from './RoleItem';

function UserProfile() {
  const { Text } = Typography
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, status: listStatus } = useAppSelector(selectUserRequest)
  const roles = data?.roles

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: (<Text>Имя пользователя</Text>),
      children: (
        <DescriptionsItem id={Number(id)} data={data} itemName={'username'} />
      ),
    },
    {
      key: '2',
      label: (<Text>Номер телефона</Text>),
      children: (
        <DescriptionsItem id={Number(id)} data={data} itemName={'phoneNumber'} />
      ),
    },
    {
      key: '3',
      label: (<Text>Email</Text>),
      children: (
        <DescriptionsItem id={Number(id)} data={data} itemName={'email'} />
      )

    }
  ];

  const loadUserData = async (id: number) => {
    await dispatch(fetchUser(id))
    await dispatch(loadProfileUserAuth())
  }

  useEffect(() => {
    loadUserData(Number(id))
  }, [dispatch])

  return (

    <Flex vertical style={{ margin: '0 16px', }}>
      {listStatus.isLoading ?
        <Spin style={{ margin: '0 auto' }} size="large" />
        :
        <Card style={{ width: '100%', height: '90dvh' }}>
          <Flex align='center'>
            <Button icon={<LeftOutlined />} type="primary" style={{ display: 'inline', insetInlineEnd: 24 }} onClick={() => { navigate('/users') }} />
            <Breadcrumb style={{ display: 'inline', margin: '16px 0', fontSize: '1.5rem' }} items={[{ title: 'Редактирование профиля' }]} />
          </Flex>

          <Flex vertical style={{ textAlign: 'center' }}>
            <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" style={{ display: 'block', margin: '0 auto' }} />
            <Title level={2} style={{ display: 'block', marginTop: '0.5rem' }}>{data?.username}</Title>
            <RoleItem rolesServer={(typeof roles !== "undefined") ? roles : []} id={Number(id)} />
          </Flex>
          <Descriptions style={{ margin: '2rem' }} layout="vertical" bordered={true} items={items} />
        </Card>

      }


    </Flex>

  );
}

export default UserProfile;