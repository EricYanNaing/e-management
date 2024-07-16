import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  const routes = [
    {
      path: "/",
      element: <Main />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
