import { LeftOutlined } from "@ant-design/icons";
import { Form, Input, Select, Switch, Typography } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
const { Title, Text, Link } = Typography;

interface EventsFormPageProps {
  className?: string;
}

const EventsFormPage: React.FC<EventsFormPageProps> = ({ className }) => {
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
          Novo Evento/Comunicado
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
        <Form.Item label="Título" name="title">
          <Input placeholder="Digite o título do evento/comunicado" />
        </Form.Item>
        <Form.Item label="Descrição" name="description">
          <Input.TextArea placeholder="Digite a descrição do evento/comunicado" />
        </Form.Item>
        <div style={{ display: "flex", gap: "10px" }}>
          <Form.Item label="Tipo" name="type" style={{ width: "30%" }}>
            <Select>
              <Select.Option value="evento">Evento</Select.Option>
              <Select.Option value="comunicado">Comunicado</Select.Option>
            </Select>
          </Form.Item>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "50%",
            }}
          >
            <Text style={{ fontSize: "14px" }}>Permite Resposta?</Text>
            <Form.Item
              name="allowResponse"
              valuePropName="checked"
              style={{ marginBottom: 0 }}
            >
              <Switch />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <button className="button-new">Publicar</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default styled(EventsFormPage)`
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
