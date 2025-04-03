import { Button, Result } from "antd";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Ops! A página que você procura não existe."
      extra={
        <Button type="primary" href="/signin">
          Voltar para a Home
        </Button>
      }
    />
  );
};

export default NotFound;
