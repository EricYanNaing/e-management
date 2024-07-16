import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Index from "./pages/Index";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Profile from "./pages/Profile";

function App() {
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
        },
        {
          path: "/edit/:id",
          element: <EditEvent />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
