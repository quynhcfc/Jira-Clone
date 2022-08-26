import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Menu(props) {
  const { userLogin } = useSelector((state) => state.UserReducer);
  return (
    <div className="menu ml-0">
      <div className="account">
        <div className="avatar">
          <img src={userLogin?.avatar} alt="Ok" />
        </div>
        <div className="account-info">
          <p>{userLogin?.name}</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card mr-1" />
          <NavLink to="/cyberbugs" activeClassName="font-bold  text-blue-700">
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-plus mr-1"></i>
          <NavLink to="/project" activeClassName="font-bold  text-blue-700">
            Create Project
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink
            to="/projectmanagement"
            activeClassName="font-bold  text-blue-700"
          >
            Project Management
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
