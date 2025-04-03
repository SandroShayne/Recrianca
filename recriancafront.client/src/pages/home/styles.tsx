import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledSider = styled(Sider)`
  background: #fff;
  padding: 24px;
`;

export const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #fff;
`;

export const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
