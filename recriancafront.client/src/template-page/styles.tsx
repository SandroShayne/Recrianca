import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  background: white;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  .logo {
    height: 64px;
    margin-left: 24px;
  }

  .user-info {
    display: flex;
    align-items: center;
    margin-right: 24px;
  }
`;
