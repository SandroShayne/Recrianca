import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";
import React from "react";

const StudentPage: React.FC = () => {
  const students = [
    {
      title: "Lucas Andrade Martins",
      ensino: "Jardim II",
    },
    {
      title: "Sofia Lima Duarte",
      ensino: "Pré II",
    },
    {
      title: "Alice Nogueira Mendes",
      ensino: "Jardim I",
    },
    {
      title: "Miguel Ferreira Souza",
      ensino: "Pré I",
    },
    {
      title: "Laura Oliveira Santos",
      ensino: "Jardim I",
    },
  ];

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={students}
        renderItem={(data) => (
          <List.Item
            actions={[
              <div key="view">
                <EyeOutlined style={{ marginRight: 4 }} />
                Visualizar
              </div>,
              <div key="edit">
                <EditOutlined style={{ marginRight: 4 }} />
                Editar
              </div>,
              <div key="delete" style={{ color: "red" }}>
                <DeleteOutlined style={{ marginRight: 4 }} />
                Deletar
              </div>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: "#0799FC" }} size={35}>
                  {data.title.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={data.title}
              description={data.ensino}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default StudentPage;
