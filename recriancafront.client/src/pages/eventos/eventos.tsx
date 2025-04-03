import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

const { Meta } = Card;

const EventsPage: React.FC = () => {
  const events = [
    {
      title: "Reunião de Pais",
      description:
        "Prezados pais e responsáveis, Convidamos vocês para uma reunião escolar que ocorrerá no dia 20/06/2025, às 09:00 horas...",
      read: false,
    },
    {
      title: "Ensaios da Festa Junina",
      description:
        "Prezados pais e responsáveis, Estamos nos preparando para a nossa Festa Junina e realizaremos ensaios nos dias 10, 17 e 24 de junho...",
      read: true,
    },
    {
      title: "Materiais Escolares",
      description:
        "Prezados responsáveis, Para darmos continuidade às atividades pedagógicas, pedimos que verifiquem se os materiais escolares estão completos...",
      read: false,
    },
  ];

  return (
    <div>
      {events?.map((data) => (
        <Card
          key={data.title}
          style={{ marginBottom: 15 }}
          actions={[
            <div key={data.title}>
              <EyeOutlined style={{ marginRight: 4 }} />
              Visualizar
            </div>,
            <div key={data.title}>
              <EditOutlined style={{ marginRight: 4 }} />
              Editar
            </div>,
            <div key={data.title} style={{ color: "red" }}>
              <DeleteOutlined style={{ marginRight: 4 }} />
              Deletar
            </div>,
          ]}
        >
          <Meta
            avatar={
              <>
                {data.read ? (
                  <MailOutlined style={{ color: "gray", fontSize: 24 }} />
                ) : (
                  <MailOutlined style={{ color: "#0799FC", fontSize: 24 }} />
                )}
              </>
            }
            title={data.title}
            description={data.description}
          />
        </Card>
      ))}
    </div>
  );
};

export default EventsPage;
