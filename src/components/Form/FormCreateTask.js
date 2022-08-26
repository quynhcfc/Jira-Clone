import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CREATE_TASK_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_PRIORITY_SAGA,
  GET_USER_BY_PROJECT_ID_SAGA,
  GET_USER_SEARCH_API,
  SET_SUBMIT_CREATE_TASK,
} from "../../redux/constants/CyberBugsConstants";
import * as Yup from "yup";
import { withFormik } from "formik";

function FormCreateTask(props) {
  const { values, handleChange, handleSubmit, setFieldValue } = props;

  const [size, setSize] = useState("middle");

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const { arrProject } = useSelector((state) => state.ProjectManagementReducer);

  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);

  const { arrPriority } = useSelector((state) => state.PriorityReducer);

  const { userProject } = useSelector((state) => state.UserReducer);

  const { arrStatus } = useSelector((state) => state.StatusReducer);

  const userOption = userProject.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit });
    dispatch({
      type: GET_USER_SEARCH_API,
      keyWord: "",
    });
  }, []);

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="font-weight-bold">Project name:</p>
            <select
              name="projectId"
              className="form-control"
              onChange={(e) => {
                let { value } = e.target;
                dispatch({
                  type: GET_USER_BY_PROJECT_ID_SAGA,
                  idProject: value,
                });
                setFieldValue("projectId", e.target.value);
              }}
            >
              {arrProject.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p className="font-weight-bold">Task name:</p>
            <input
              onChange={handleChange}
              className="form-control"
              type="text"
              name="taskName"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-4">
            <p className="font-weight-bold">Priority:</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriority.map((item, index) => {
                return (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <p className="font-weight-bold">Task type:</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.taskType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <p className="font-weight-bold">Status:</p>
            <select
              name="statusId"
              className="form-control"
              onChange={handleChange}
            >
              {arrStatus.map((item, index) => {
                return (
                  <option key={index} value={item.statusId}>
                    {item.statusName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <div>
              <p className="font-weight-bold">Add member:</p>
              <Select
                style={{
                  width: "100%",
                }}
                mode="multiple"
                size={size}
                placeholder="Please select"
                options={userOption}
                optionFilterProp="label"
                onSelect={(value) => {
                  // console.log("value", value);
                }}
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
              ></Select>
            </div>
            <div className="mt-1">
              <p className="font-weight-bold">Original Estimate:</p>
              <input
                onChange={handleChange}
                className="form-control"
                type="number"
                defaultValue="0"
                min="0"
                name="originalEstimate"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-1">
              <p className="font-weight-bold">Time tracking:</p>
              <Slider
                className="m-0"
                defaultValue={30}
                value={timeTracking.timeTrackingSpent}
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
              />
              <div className="row">
                <div className="col-6 text-left">
                  {timeTracking.timeTrackingSpent}h logged
                </div>
                <div className="col-6 text-right">
                  {timeTracking.timeTrackingRemaining}h remaining
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p className="font-weight-bold">Time spent:</p>
                <input
                  className="form-control"
                  type="number"
                  defaultValue="0"
                  min="0"
                  name="timeTrackingSpent"
                  onClick={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <p className="font-weight-bold">Time remaining:</p>
                <input
                  className="form-control"
                  type="number"
                  defaultValue="0"
                  min="0"
                  name="timeTrackingRemaining"
                  onClick={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p className="font-weight-bold">Description:</p>
        <Editor
          name="description"
          //   initialValue={values.description}
          init={{
            height: 250,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(content, editor) => {
            setFieldValue("description", content);
          }}
        />
      </div>
    </form>
  );
}

const formCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    //
    props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
  },

  displayName: "Form Create Task",
})(FormCreateTask);

const mapToStateProps = (state) => {
  return {
    //
    arrProject: state.ProjectManagementReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapToStateProps)(formCreateTask);
