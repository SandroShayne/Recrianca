import React from "react";
import { Checkbox, Form, Input, Select, Typography, DatePicker } from "antd";
import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
const { Title, Text, Link } = Typography;

interface StudentsFormPageProps {
  className?: string;
}

const StudentsFormPage: React.FC<StudentsFormPageProps> = ({ className }) => {
  const isMobile = useMediaQuery({ maxWidth: 968 });

  return (
    <div className={className}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title
          level={1}
          style={{ margin: 0, fontSize: isMobile ? "20px" : "32px" }}
        >
          Cadastrar Aluno
        </Title>
        <Link style={{ color: "black", display: "flex" }} strong href="/home">
          <LeftOutlined />
          <Text
            style={{
              fontSize: isMobile ? "14px" : "16px",
              textAlign: "center",
              marginLeft: "10px",
            }}
          >
            Retornar
          </Text>
        </Link>
      </div>

      <Form layout="vertical" style={{ marginTop: "20px", fontSize: "16px" }}>
        <div style={{ display: "flex", gap: "25px", width: "100%" }}>
          <Form.Item
            label="Nome Completo"
            name="name"
            style={{ width: "100%" }}
          >
            <Input placeholder="Digite o nome do aluno" />
          </Form.Item>
          <Form.Item
            label="Data de Nascimento"
            name="birthDate"
            style={{ width: "30%" }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div style={{ display: "flex", gap: "25px", width: "100%" }}>
          <Form.Item label="Turma" name="turma" style={{ width: "100%" }}>
            <Input placeholder="Digite a turma do aluno" />
          </Form.Item>
          <Form.Item
            label="Responsável"
            name="responsavel"
            style={{ width: "100%" }}
          >
            <Input placeholder="Digite o responsável do aluno" />
          </Form.Item>
        </div>
        <Form.Item label="Observação" name="observacao">
          <Input.TextArea placeholder="Digite a observação do aluno" />
        </Form.Item>

        <hr style={{ width: "100%", margin: "30px 0" }} />
        <Title
          level={4}
          style={{ margin: 0, fontSize: isMobile ? "20px" : "32px" }}
        >
          Endereço
        </Title>
        <div style={{ display: "flex", gap: "25px", width: "100%" }}>
          <Form.Item label="Rua" name="rua" style={{ width: "100%" }}>
            <Input placeholder="Digite a rua do aluno" />
          </Form.Item>
          <Form.Item label="Número" name="numero" style={{ width: "100%" }}>
            <Input placeholder="Digite o número da rua" />
          </Form.Item>
        </div>
        <div style={{ display: "flex", gap: "25px", width: "100%" }}>
          <Form.Item label="Bairro" name="bairro" style={{ width: "100%" }}>
            <Input placeholder="Digite o bairro do aluno" />
          </Form.Item>
          <Form.Item label="Estado" name="estado" style={{ width: "100%" }}>
            <Input placeholder="Digite o estado do aluno" />
          </Form.Item>
        </div>
        <Form.Item>
          <button className="button-new">Cadastrar</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default styled(StudentsFormPage)`
  display: flex;
  flex-direction: column;
  padding: 40px;

  .button-new {
    margin-top: 20px;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background: #0799fc;
    display: flex;
    align-items: center;
    gap: 5px;
    border: none;
    border-radius: 8px;

    &:hover {
      background: #407697;
    }
  }

  .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
    margin-top: 15px;
  }

  .card-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .card-buttons button {
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    border: none;

    &.button-view {
      background: #b3ffb3;

      &:hover {
        background: #659465;
        color: #fff;
      }
    }

    &.button-edit {
      background: #f4f8be;

      &:hover {
        background: #a0a37d;
        color: #fff;
      }
    }

    &.button-delete {
      background: #f6acac;

      &:hover {
        background: #a47373;
        color: #fff;
      }
    }
  }
`;
