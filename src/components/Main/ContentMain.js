import React from "react";

export default function ContentMain(props) {
  const { projectDetail } = props;

  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((taskList, index) => {
      return (
        <div
          className="card"
          style={{ width: "25%", height: "25rem" }}
          key={index}
        >
          <div className="card-header">{taskList.statusName}</div>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              style={{ cursor: "pointer" }}
            >
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-bookmark" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    {projectDetail.members?.map((item, index) => {
                      return (
                        <div className="avatar" key={index}>
                          <img src={item.avatar} alt="Fail" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-check-square" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    {projectDetail.members?.map((item, index) => {
                      return (
                        <div className="avatar" key={index}>
                          <img src={item.avatar} alt="Fail" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      );
    });
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}
