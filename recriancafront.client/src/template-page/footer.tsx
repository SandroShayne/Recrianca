import { Layout, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Footer } = Layout;
const { Text } = Typography;

const StyledFooter = styled(Footer)`
  background-color: #343434;
  padding: 10px;
  text-align: center;
`;

const AppFooter: React.FC = () => {
  return (
    <StyledFooter>
      <Text style={{ color: "#fff" }}>
        &copy; {new Date().getFullYear()} Recriança. Todos os direitos
        reservados.
      </Text>
    </StyledFooter>
  );
};

export default AppFooter;
