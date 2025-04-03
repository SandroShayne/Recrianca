import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LogoRecrianca from "../logo-header.svg";
import { StyledHeader } from "./styles";

const { Text } = Typography;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getFirstName = (fullName: string | undefined): string => {
    if (!fullName) return "Visitante";
    return fullName.split(" ")[0];
  };

  const firstName = getFirstName(user?.unique_name);

  return (
    <StyledHeader>
      <img src={LogoRecrianca} alt="logo" className="logo" />
      <div className="user-info">
        <Text style={{ marginRight: 16 }}>Olá, {firstName}!</Text>
        <Avatar style={{ backgroundColor: "#0799FC" }} size={35}>
          {user?.unique_name ? user.unique_name.charAt(0).toUpperCase() : "V"}
        </Avatar>
        <Menu mode="horizontal" selectable={false}>
          <Menu.Item key="profile" title="Meu perfil" icon={<UserOutlined />}>
            {" "}
            Meu perfil
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Sair
          </Menu.Item>
        </Menu>
      </div>
    </StyledHeader>
  );
};

export default AppHeader;
