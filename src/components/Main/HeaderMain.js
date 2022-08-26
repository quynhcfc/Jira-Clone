import React from "react";

export default function HeaderMain(props) {
  const { projectDetail } = props;
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li className="breadcrumb-item active" aria-current="page">
            Cyber Board
          </li>
        </ol>
      </nav>
      <h3 className="text-2xl font-bold text-blue-800">
        {projectDetail.projectName}
      </h3>
    </div>
  );
}
