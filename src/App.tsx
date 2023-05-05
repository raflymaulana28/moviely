import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./containers/Home";
import { QueryClientProvider } from "react-query";
import queryClient from "./configs/client";
import DetailMovie from "./containers/DetailMovie";
import SearchMovie from "./containers/SearchMovie";
import FavoriteContextProvider from "./hooks/useFavorite";
import Favorite from "./containers/Favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchMovie />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
  {
    path: "/movie/:id",
    element: <DetailMovie />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteContextProvider>
        <RouterProvider router={router} />
      </FavoriteContextProvider>
    </QueryClientProvider>
  );
}

export default App;
