import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  FacebookFilled,
  GooglePlusOutlined,
  TwitterOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { singnAdminCyberBugsAction } from "../../redux/actions/CyberBugsActions";
import { NavLink } from "react-router-dom";

function LoginAdmin(props) {
  const { handleChange, handleSubmit, errors } = props;

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl text-blue-700 mb-8">Admin Jira Clone!!!</h2>

      <form onSubmit={handleSubmit} className="w-2/3">
        <div>
          <Input
            name="email"
            placeholder="Email"
            size="large"
            prefix={<MailOutlined className="mr-2" />}
            onChange={handleChange}
          />
        </div>
        <div className="text-red-500 italic">{errors.email}</div>

        <div className="my-3">
          <Input.Password
            name="password"
            placeholder="Password"
            size="large"
            prefix={<LockOutlined className="mr-2" />}
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="text-red-500 italic">{errors.password}</div>
        <div className="flex justify-between items-center mb-3">
          <Form.Item
            name="remember"
            valuePropName=""
            className="text-right mb-0"
          >
            <Checkbox>Remember</Checkbox>
          </Form.Item>
          <p>
            Are you a new member?
            <NavLink to="/register" className="uppercase text-blue-600 ml-1">
              Register now
            </NavLink>
          </p>
        </div>
        <Button
          htmlType="submit"
          size="large"
          className="bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold pt-1 pb-2 px-4 rounded w-full"
        >
          Login
        </Button>

        <div className="mt-3">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white mx-2"
            type=""
            shape="circle"
            icon={<FacebookFilled />}
            size="large"
          />
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white mx-2"
            type=""
            shape="circle"
            icon={<GooglePlusOutlined />}
            size="large"
          />
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white mx-2"
            type=""
            shape="circle"
            icon={<TwitterOutlined />}
            size="large"
          />
        </div>
      </form>
    </div>
  );
}

const LoginAdminWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string()
      .min(6, "Password must have min 6 characters")
      .max(32, "Password must have max 6 characters"),
  }),

  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    // setSubmitting(true);

    props.dispatch(singnAdminCyberBugsAction(email, password));
  },

  displayName: "Jira Login Admin",
})(LoginAdmin);

export default connect()(LoginAdminWithFormik);
