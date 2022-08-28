import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GET_LIST_USER_SAGA } from "../../redux/constants/CyberBugsConstants";
import SiderbarAdmin from "./SiderbarAdmin";

export default function ListUser(props) {
  const { listUser } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_LIST_USER_SAGA });
  }, []);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({
      filteredInfo: null,
    });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setIdSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "userId",
      },
    });
  };

  let { sortedInfo } = state;
  sortedInfo = sortedInfo || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",

      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === "userId" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            // onClick={() => {
            //   const action = {
            //     type: OPEN_FORM_EDIT_PROJECT,
            //     title: "Edit Project",
            //     Component: <FormEditProject />,
            //   };
            //   // dispatch lên reducer nội dung drawer
            //   dispatch(action);

            //   // dispatch dữ liệu dòng hiện tại lên reducer
            //   const actionEditProject = {
            //     //
            //     type: EDIT_PROJECT,
            //     projectEditModal: record,
            //   };
            //   dispatch(actionEditProject);
            // }}
            className="bg-blue-600 px-2 py-1 text-white rounded-sm hover:bg-blue-800"
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this member?"
            // onConfirm={() => {
            //   dispatch({
            //     type: DELETE_PROJECT_SAGA,
            //     idProject: record.id,
            //   });
            // }}
            okType="danger"
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-red-600 px-2 py-1 text-white rounded-sm hover:bg-red-800">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex">
      <SiderbarAdmin />
      <div className="w-full h-screen px-4">
        <h3 className="text-3xl font-bold my-3">User Management</h3>
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={listUser}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
