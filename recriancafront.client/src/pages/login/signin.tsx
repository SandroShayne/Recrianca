import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Typography, message } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Container,
  ContainerMobile,
  ContainerRegister,
  Image,
  LeftSection,
  RightSection,
  StyledButton,
  StyledCard,
} from "./styles";

const { Title, Text, Link } = Typography;

const FormLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await login(values.email, values.password);
      message.success("Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro no login:", error);
        message.error("Falha no login. Por favor, verifique suas credenciais.");
      } else {
        // Se o erro for devido à validação do formulário, não exibimos mensagem de erro
        console.error("Erro de validação:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RightSection>
      <StyledCard>
        <Title style={{ textAlign: "center" }} level={2}>
          Login
        </Title>
        <Form form={form} layout="vertical">
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Digite seu e-mail" },
              { type: "email", message: "Digite um e-mail válido" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Digite seu e-mail" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Digite sua senha"
            />
          </Form.Item>

          <Form.Item>
            <StyledButton
              style={{ marginTop: "16px" }}
              color="default"
              variant="solid"
              onClick={handleLogin}
              loading={loading}
            >
              Entrar
            </StyledButton>
          </Form.Item>
        </Form>
        <ContainerRegister>
          <Text className="text-center block mt-4">Não tem cadastro?</Text>
          <Link style={{ color: "black" }} underline strong href="/signup">
            Registre-se!
          </Link>
        </ContainerRegister>
      </StyledCard>
    </RightSection>
  );
};

const SignIn: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 968 });

  if (isMobile) {
    return (
      <ContainerMobile>
        <FormLogin />
      </ContainerMobile>
    );
  }

  return (
    <Container>
      <LeftSection>
        <Title
          level={2}
          style={{ color: "#343434", fontSize: "48px", textAlign: "center" }}
        >
          É ótimo ter você de volta! :)
        </Title>
        <Text style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
          Faça login e acompanhe os detalhes da rotina escolar.
        </Text>
        <Image src="/images/image-login.png" alt="Login" />
      </LeftSection>

      <FormLogin />
    </Container>
  );
};

export default SignIn;
