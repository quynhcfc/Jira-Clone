import React from "react";
import Lottie from "lottie-react";
import animationLogin from "../assets/lotties/login-screen.json";
import { Route } from "react-router-dom";

export const UserLoginTemplate = (props) => {
  let { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <div className="grid grid-cols-2">
              <div className="h-screen w-full bg-slate-600 text-white text-4xl">
                <Lottie
                  animationData={animationLogin}
                  className="w-full h-full mx-auto"
                  loop={true}
                />
              </div>
              <Component {...propsRoute} />
            </div>
          </>
        );
      }}
    />
  );
};
