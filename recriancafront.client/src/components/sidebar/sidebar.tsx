import { Divider, Menu, Typography } from "antd";
import { MenuProps } from "antd/es/menu";
import React from "react";

const { Title } = Typography;

interface SidebarProps {
  onMenuItemClick: (key: string) => void;
  items: MenuProps["items"];
  selectedKey: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  onMenuItemClick,
  selectedKey,
}) => {
  return (
    <div>
      <Title level={5} style={{ marginTop: "6px" }}>
        Menu
      </Title>
      <Divider style={{ margin: "12px 0" }} />
      <Menu
        mode="vertical"
        items={items}
        selectedKeys={[selectedKey]}
        onClick={({ key }) => onMenuItemClick(key)}
      />
    </div>
  );
};

export default Sidebar;
