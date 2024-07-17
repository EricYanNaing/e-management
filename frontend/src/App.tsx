import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Index from "./pages/Index";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import isLogin from "./components/common/isLogin";

function App() {
  const token = localStorage.getItem("token");
  const routes = [
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/event/:id",
          element: <EventDetail />,
        },
        {
          path: "/create",
          element: <CreateEvent />,
          loader: isLogin,
        },
        {
          path: "/edit/:id",
          loader: isLogin,
          element: <EditEvent />,
        },
        {
          path: "/profile/:id",
          loader: isLogin,
          element: <Profile />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
