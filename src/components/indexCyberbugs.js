import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DETAIL_PROJECT_SAGA } from "../redux/constants/CyberBugsConstants";
import ContentMain from "./Main/ContentMain";
import HeaderMain from "./Main/HeaderMain";
import InfoMain from "./Main/InfoMain";

export default function IndexCyberbugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const { projectId } = props.match.params;

    dispatch({
      type: DETAIL_PROJECT_SAGA,
      projectId,
    });
  }, []);

  return (
    <div className="main w-3/4 mx-auto px-4">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain members={projectDetail.members} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
