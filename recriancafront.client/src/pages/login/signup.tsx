import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input, message, notification, Select, Typography } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/signup.service";
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
const { Option } = Select;

const FormCadastro: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const signupData = {
        usuario_Id: 0, // Assumindo que o backend gera este ID
        Tipo: values.userType,
        Nome: values.nome,
        Email: values.email,
        Senha: values.password,
        ConfirmarSenha: values.confirmPassword,
        TelContato: values.telefone,
      };

      await signupService(signupData);
      notification.success({
        message: "Cadastro Realizado com Sucesso!",
        description:
          "Seu cadastro foi concluído. Você será redirecionado para a página de login.",
        duration: 5,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Erro no cadastro: ${error.message}`);
      } else {
        message.error("Ocorreu um erro inesperado durante o cadastro.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RightSection>
      <StyledCard>
        <Title style={{ textAlign: "center" }} level={2}>
          Registre-se
        </Title>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Digite seu nome" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Digite seu nome" />
          </Form.Item>

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
            rules={[
              { required: true, message: "Digite sua senha" },
              { min: 6, message: "A senha deve ter pelo menos 6 caracteres" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Digite sua senha"
            />
          </Form.Item>

          <Form.Item
            label="Confirmar Senha"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirme sua senha" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("As senhas não coincidem!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirme sua senha"
            />
          </Form.Item>

          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[{ required: true, message: "Digite seu telefone" }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Digite seu telefone"
            />
          </Form.Item>

          <Form.Item
            label="Tipo de Usuário"
            name="userType"
            rules={[{ required: true, message: "Selecione o tipo de usuário" }]}
          >
            <Select placeholder="Selecione seu tipo de usuário">
              <Option value="Funcionario">Funcionário</Option>
              <Option value="Responsavel">Responsável</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <StyledButton
              style={{ marginTop: "16px" }}
              color="default"
              variant="solid"
              onClick={handleCadastro}
              loading={loading}
            >
              Cadastrar
            </StyledButton>
          </Form.Item>
        </Form>
        <ContainerRegister>
          <Text className="text-center block mt-4">Já tem cadastro?</Text>
          <Link style={{ color: "black" }} underline strong href="/">
            Faça login!
          </Link>
        </ContainerRegister>
      </StyledCard>
    </RightSection>
  );
};

const SignUp: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 968 });

  if (isMobile) {
    return (
      <ContainerMobile>
        <FormCadastro />
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
          Seja Bem-Vindo(a)!
        </Title>
        <Text style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
          Seu acesso ao futuro da gestão escolar começa aqui. Faça seu cadastro
          e aproveite!
        </Text>
        <Image src="/images/image-cadastro.png" alt="Login" />
      </LeftSection>

      <FormCadastro />
    </Container>
  );
};

export default SignUp;
