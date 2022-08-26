import React, { useState, useCallback } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import {
  OPEN_FORM_CREATE_TASK,
  USER_LOGIN,
} from "../redux/constants/CyberBugsConstants";
import FormCreateTask from "./Form/FormCreateTask";

const { Sider } = Layout;

export default function Siderbar(props) {
  const dispatch = useDispatch();

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
    localStorage.removeItem(USER_LOGIN);

    window.location.href = "/";
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
          <Menu.Item
            key="1"
            className="text-base text-white"
            onClick={() => {
              dispatch({
                //
                type: OPEN_FORM_CREATE_TASK,
                Component: <FormCreateTask />,
                title: "Create Task",
              });
            }}
          >
            <PlusCircleOutlined />
            <span className="ml-2">Create Task</span>
          </Menu.Item>
          <Menu.Item key="2" className="text-base text-white">
            <SearchOutlined />
            <span className="ml-2">Search</span>
          </Menu.Item>

          <Menu.Item
            key="3"
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
