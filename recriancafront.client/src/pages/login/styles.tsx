import { Button, Card } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const ContainerMobile = styled.div`
  background: linear-gradient(135deg, #1890ff 0%, rgb(1, 40, 82) 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const LeftSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1890ff;
  color: white;
  padding: 40px;
`;

export const RightSection = styled.div`
  width: -webkit-fill-available;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  padding: 24px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const Image = styled.img`
  width: -webkit-fill-available;
`;

export const ImageLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ContainerRegister = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;
