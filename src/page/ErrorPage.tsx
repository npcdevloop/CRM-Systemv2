import { Button, Result } from 'antd';
import { NavLink } from 'react-router-dom';

function ErrorPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не была найдена, видимо ее не существует."
      extra={<Button type="primary"><NavLink to="/">Пора возвращаться домой</NavLink></Button>}
    />
  );
}

export default ErrorPage;