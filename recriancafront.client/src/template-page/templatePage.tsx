import { Layout } from "antd";
import React from "react";
import styled from "styled-components";
import AppFooter from "./footer";
import AppHeader from "./header";

const { Content } = Layout;

interface TemplatePageProps {
  children: React.ReactNode;
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 0 24px;
  background-color: rgb(255, 255, 255);
`;

const TemplatePage: React.FC<TemplatePageProps> = ({ children }) => {
  return (
    <StyledLayout>
      <AppHeader />
      <StyledContent>{children}</StyledContent>
      <AppFooter />
    </StyledLayout>
  );
};

export default TemplatePage;
