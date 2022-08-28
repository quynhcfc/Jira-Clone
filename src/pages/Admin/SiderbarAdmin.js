import React, { useState, useCallback } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_LOGIN } from "../../redux/constants/CyberBugsConstants";

const { Sider } = Layout;

export default function SiderbarAdmin(props) {
  const dispatch = useDispatch();

  const { adminLogin } = useSelector((state) => state.UserReducer);

  const [state, setState] = useState({
    collapsed: true,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const handleLogout = useCallback(() => {
    //
    localStorage.removeItem(ADMIN_LOGIN);
    window.location.href = "/admin";
  }, []);

  return (
    <div className="">
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        className="h-full"
      >
        <div
          className="logo text-white text-2xl text-center mb-2 cursor-pointer"
          onClick={toggle}
        >
          {state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" className="text-base text-white">
            <UserOutlined />
            <span className="ml-2">{adminLogin?.name}</span>
          </Menu.Item>

          <Menu.Item
            key="2"
            className="text-base text-white"
            onClick={handleLogout}
          >
            <LogoutOutlined />
            <span className="ml-2">Log Out</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
