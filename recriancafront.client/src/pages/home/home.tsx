import {
  BellOutlined,
  FileOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Empty, Input, Space, Tag, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { useAuth } from "../../hooks/useAuth";
import { isFuncionario } from "../../utils/is-funcionario";
import StudentPage from "../alunos/alunos";
import EventsPage from "../eventos/eventos";
import {
  StyledContent,
  StyledFilter,
  StyledLayout,
  StyledSider,
} from "./styles";

const { Search } = Input;
const { Title, Text } = Typography;

const Home: React.FC = () => {
  const [selectedPage, setSelectedPage] =
    useState<string>("EventosComunicados");
  const { user } = useAuth();
  const navigate = useNavigate();

  const sidebarItems = [
    {
      key: "EventosComunicados",
      icon: <BellOutlined />,
      label: "Eventos/Comunicados",
      create: "/create-event",
    },
    {
      key: "Alunos",
      icon: <UsergroupAddOutlined />,
      label: "Alunos",
      create: "/create-student",
    },
    {
      key: "Documentacao",
      icon: <FileOutlined />,
      label: "Documentação dos Alunos",
      create: "/create-documentation",
    },
  ];

  const isFunc = isFuncionario(user);

  const handleMenuItemClick = (key: string) => {
    setSelectedPage(key);
  };

  // Encontra o item da sidebar correspondente à página selecionada
  const selectedItem = sidebarItems.find((item) => item.key === selectedPage);

  return (
    <StyledLayout>
      <StyledSider width={300} breakpoint="lg" collapsedWidth="0">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Search placeholder="Pesquisar" />
          <StyledFilter>
            <Text strong>Filtros</Text>
            <Space wrap style={{ marginTop: 8 }}>
              <Tag closable>Eventos</Tag>
              <Tag closable>Comunicados</Tag>
            </Space>
          </StyledFilter>
          {isFunc && (
            <Sidebar
              items={sidebarItems}
              onMenuItemClick={handleMenuItemClick}
              selectedKey={selectedPage ?? ""}
            />
          )}
        </Space>
      </StyledSider>
      <StyledContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={3} style={{ margin: 0 }}>
              {selectedItem?.label ?? ""}
            </Title>
            <Text
              className="text-center mb-4"
              style={{ color: "#757575", fontWeight: 400 }}
            >
              Recriança Espaço Infantil
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(selectedItem?.create || "")}
          >
            Novo
          </Button>
        </div>
        {selectedPage === "Alunos" && <StudentPage />}
        {selectedPage === "EventosComunicados" && <EventsPage />}
        {!selectedPage && (
          <Empty
            description={<Text>Ainda não existe eventos e/ou comunicados</Text>}
          />
        )}
      </StyledContent>
    </StyledLayout>
  );
};

export default Home;
