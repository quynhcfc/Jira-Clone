import React, { useState, useEffect, useRef } from "react";
import {
  Popconfirm,
  Avatar,
  Button,
  Space,
  Table,
  Tag,
  Popover,
  AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_USER_PROJECT_API,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_USER_SEARCH_API,
  OPEN_FORM_EDIT_PROJECT,
  REMOVE_USER_PROJECT_API,
} from "../../redux/constants/CyberBugsConstants";
import FormEditProject from "../../components/Form/FormEditProject";
import { NavLink } from "react-router-dom";

export default function ProjectManagement(props) {
  // Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectManagementReducer.projectList
  );

  // Search members add project
  const { userSearch } = useSelector((state) => state.UserReducer);

  const [value, setValue] = useState("");

  const searchRef = useRef(null);

  // Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    //
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, [dispatch]);

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
        columnKey: "id",
      },
    });
  };

  let { sortedInfo } = state;
  sortedInfo = sortedInfo || {};
  // filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortOrder: sortedInfo.columnKey === "projectName" && sortedInfo.order,
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <NavLink
            to={`/projectdetail/${record.id}`}
            className="text-blue-700 font-medium uppercase"
          >
            {text}
          </NavLink>
        );
      },
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            <div>
              {record.members?.slice(0, 3).map((item, index) => {
                return (
                  <Popover
                    key={index}
                    placement="top"
                    title={"Member List"}
                    content={() => {
                      return (
                        <table className="table">
                          <thead>
                            <tr className="text-center">
                              <td>ID</td>
                              <td>Avatar</td>
                              <td>Name</td>
                              <td>Action</td>
                            </tr>
                          </thead>
                          <tbody>
                            {record.members?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.userId}</td>
                                  <td>
                                    <img
                                      src={item.avatar}
                                      width="30"
                                      height="30"
                                      className="rounded"
                                    />
                                  </td>
                                  <td>{item.name}</td>
                                  <td>
                                    <button
                                      className="btn btn-danger px-1 py-0"
                                      style={{ fontSize: "12px" }}
                                      onClick={() => {
                                        dispatch({
                                          type: REMOVE_USER_PROJECT_API,
                                          userProject: {
                                            userId: item.userId,
                                            projectId: record.id,
                                          },
                                        });
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      );
                    }}
                  >
                    <Avatar key={index}>{item.name}</Avatar>
                  </Popover>
                );
              })}

              {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            </div>
            <div>
              <Popover
                placement="right"
                title={"Add User"}
                content={() => {
                  return (
                    <div>
                      <AutoComplete
                        options={userSearch?.map((item, index) => {
                          return {
                            label: item.name,
                            value: item.userId.toString(),
                          };
                        })}
                        style={{
                          width: 200,
                        }}
                        value={value}
                        onSelect={(valueSelect, option) => {
                          setValue(option.label);

                          dispatch({
                            type: ADD_USER_PROJECT_API,
                            userProject: {
                              projectId: record.id,
                              userId: valueSelect,
                            },
                          });
                        }}
                        onSearch={(value) => {
                          if (searchRef.current) {
                            clearTimeout(searchRef.current);
                          }
                          searchRef.current = setTimeout(() => {
                            dispatch({
                              type: GET_USER_SEARCH_API,
                              keyWord: value,
                            });
                          }, 500);
                        }}
                        onChange={(text) => {
                          setValue(text);
                        }}
                        placeholder="enter name"
                      />
                    </div>
                  );
                }}
                trigger="click"
              >
                <Button className="rounded-full px-2">+</Button>
              </Popover>
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            onClick={() => {
              const action = {
                type: OPEN_FORM_EDIT_PROJECT,
                title: "Edit Project",
                Component: <FormEditProject />,
              };
              // dispatch lên reducer nội dung drawer
              dispatch(action);

              // dispatch dữ liệu dòng hiện tại lên reducer
              const actionEditProject = {
                //
                type: EDIT_PROJECT,
                projectEditModal: record,
              };
              dispatch(actionEditProject);
            }}
            className="bg-blue-600 px-2 py-1 text-white rounded-sm hover:bg-blue-800"
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({
                type: DELETE_PROJECT_SAGA,
                idProject: record.id,
              });
            }}
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
    <div className="w-3/4 max-h-screen px-4">
      <h3 className="text-3xl font-bold my-5">Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setIdSort}>Sort id</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
