import React from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { USER_SIGNUP_SAGA } from "../../redux/constants/CyberBugsConstants";

function RegisterPage(props) {
  const { handleChange, handleSubmit, errors } = props;

  const dispatch = useDispatch();

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl text-blue-700 mb-8">Wellcome to Jira Clone!!!</h2>

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

        <div className="mt-3">
          <Input.Password
            name="passWord"
            placeholder="Password"
            size="large"
            prefix={<LockOutlined className="mr-2" />}
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="text-red-500 italic">{errors.passWord}</div>

        <div className="mt-3">
          <Input
            name="name"
            placeholder="Name"
            size="large"
            prefix={<UserOutlined className="mr-2" />}
            onChange={handleChange}
          />
        </div>
        <div className="text-red-500 italic">{errors.name}</div>

        <div className="mt-3">
          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            size="large"
            prefix={<PhoneOutlined className="mr-2" />}
            onChange={handleChange}
          />
        </div>
        <div className="text-red-500 italic">{errors.phoneNumber}</div>

        <div className="text-right my-3">
          <p>
            Are you a account?
            <NavLink to="/" className="uppercase text-blue-600 ml-1">
              Login now
            </NavLink>
          </p>
        </div>
        <Button
          htmlType="submit"
          size="large"
          className="bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold pt-1 pb-2 px-4 rounded w-full"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterCyberBugsWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email is invalid!"),
    // .required("Email is required!"),
    passWord: Yup.string()
      .min(6, "Password must have min 6 characters")
      .max(32, "Password must have max 6 characters"),
    name: Yup.string().min(2, "Too short!").max(50, "Too long!"),
    // .required("Required"),

    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone numbers have 10 digits")
      .max(10, "Phone numbers have 10 digits"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    // setSubmitting(true);
    console.log("values", values);
    props.dispatch({
      type: USER_SIGNUP_SAGA,
      userRegister: values,
    });
  },

  displayName: "Jira Register Form",
})(RegisterPage);

export default connect()(RegisterCyberBugsWithFormik);
