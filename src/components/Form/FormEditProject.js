import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  SET_SUBMIT_EDIT_PROJECT,
  UPDATE_PROJECT_SAGA,
} from "../../redux/constants/CyberBugsConstants";
import * as Yup from "yup";
import { withFormik } from "formik";

function FormEditProject(props) {
  const { values, handleChange, handleSubmit, setFieldValue } = props;

  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Gọi api load project Category
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });

    // Load sự kiện submit lên drawer
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    // console.log("content", content);
    setFieldValue("description", content);
  };

  return (
    <form action="" className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">ID:</p>
            <input
              type="text"
              className="form-control"
              disabled
              name="id"
              value={values.id}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Name:</p>
            <input
              type="text"
              className="form-control"
              name="projectName"
              value={values.projectName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Category:</p>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <div className="form-group">
              <p className="font-weight-bold">Description:</p>
              <Editor
                name="description"
                initialValue={values.description}
                init={{
                  height: 500,
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
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    //
    const action = {
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    };
    props.dispatch(action);
    console.log("values", values);
  },

  displayName: "Edit Project Form",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(editProjectForm);
