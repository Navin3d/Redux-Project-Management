import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages";
import { NotFound } from "./components/Results";
import LoginPage from "./pages/LoginPage";
import ProtectedComponent from "./components/ProtectedComponent";
import OAuthPage from "./pages/OAuthPage";
import ProjectPage from "./pages/project/ProjectPage";
import ProjectListPage from "./pages/project/ProjectListPage";
import TaskListPage from "./pages/task/TaskListPage";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedComponent component={<HomePage />} />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/oauth/:id",
    element: <OAuthPage />
  },
  {
    path: "/projects/:kind",
    element: <ProjectListPage />
  },
  {
    path: "/tasks/:kind/:status",
    element: <TaskListPage />
  },
  {
    path: "/project/:id",
    element: <ProjectPage />
  },
  {
    path: "*",
    element: <NotFound />
  },
]);

const App = () => (
  <div>
    <RouterProvider router={routes} />
  </div>
);

export default App;
