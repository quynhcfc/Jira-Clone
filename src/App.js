import { Router, Switch } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { UserLoginTemplate } from "./templates/UserLoginTemplate";
import { history } from "./libs/History";
import { CyberBugsTemplate } from "./templates/CyberBugsTemplate";
import CreateProject from "./pages/CreateProjects/CreateProject";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import DrawerCyberbugs from "./HOC/DrawerCyberbugs";
import IndexCyberbugs from "./components/indexCyberbugs";
import RegisterPage from "./pages/Register/RegisterPage";
import LoadingComponent from "./components/Loading/LoadingComponent";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import ListUser from "./pages/Admin/ListUser";
import { AdminTemplate } from "./templates/AdminTemplate";

function App() {
  return (
    <Router history={history}>
      <LoadingComponent />
      <DrawerCyberbugs />
      <Switch>
        <UserLoginTemplate exact path="/" Component={LoginPage} />
        <UserLoginTemplate exact path="/register" Component={RegisterPage} />
        <AdminTemplate exact path="/admin" Component={LoginAdmin} />
        {/* <AdminTemplate exact path="/listuser" Component={ListUser} /> */}
        <ListUser exact path="/listuser" />
        <CyberBugsTemplate exact path="/cyberbugs" Component={IndexCyberbugs} />
        <CyberBugsTemplate exact path="/project" Component={CreateProject} />
        <CyberBugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberBugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={IndexCyberbugs}
        />
      </Switch>
    </Router>
  );
}

export default App;
