import React from "react";
import { Route } from "react-router-dom";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import Siderbar from "../components/Siderbar";
import "../index.css";

export const CyberBugsTemplate = (props) => {
  let { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <Siderbar />
              <Menu />
              <Component {...propsRoute} />
              <Modal />
            </div>
          </>
        );
      }}
    />
  );
};
