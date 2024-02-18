import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages";
import { NotFound } from "./components/Results";
import LoginPage from "./pages/LoginPage";
import ProtectedComponent from "./components/ProtectedComponent";
import OAuthPage from "./pages/OAuthPage";


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
