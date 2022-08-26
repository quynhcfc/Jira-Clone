import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../redux/constants/CyberBugsConstants";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const dispatch = useDispatch();

  const { handleChange, handleSubmit, setFieldValue } = props;

  useEffect(() => {
    //goi API
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);

  const handleEditorChange = (content, editor) => {
    // console.log("content", content);
    setFieldValue("description", content);
  };

  return (
    <div className="w-3/4 mx-auto px-4">
      <h3 className="text-3xl font-bold">Create Project</h3>
      <form className="w-auto" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="row">
          <div className="form-group col-6">
            <p>Name:</p>
            <input type="text" className="form-control" name="projectName" />
          </div>
          <div className="form-group col-6">
            <p>Category:</p>
            <select
              name="categoryId"
              className="form-control"
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
        <div className="form-group">
          <p>Description:</p>
          <Editor
            name="description"
            // onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 450,
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
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-blue-600 btn-outline-primary text-white hover:bg-blue-900"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

const CreateProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    projectName: "",
    description: "",
    categoryId: props.arrProjectCategory[0]?.id,
  }),

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log("props", values);

    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },

  displayName: "Jira Create Project Form",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(CreateProjectForm);
