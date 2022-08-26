import React from "react";
// import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../redux/constants/CyberBugsConstants";
import { useSelector, useDispatch } from "react-redux";

export default function DrawerCyberbugs(props) {
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.drawerReducer);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };

  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        footer={
          <div className="text-right mb-4">
            <Button
              onClick={onClose}
              danger
              className="hover:bg-red-500 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              // onClick={onClose}
              onClick={callBackSubmit}
              type="primary"
              className="bg-blue-500 hover:bg-blue-800 mr-4 ml-2"
            >
              Submit
            </Button>
          </div>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
