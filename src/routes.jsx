import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@l/RootLayout";
import NotFound from "@p/NotFound";
import Feed from "@p/Feed";
import Login from "@p/Login";
import ReviewWrite from "@p/ReviewWrite";
import Region from "@p/Region";
import ReviewList from "@p/ReviewList";
import Reservation from "./pages/Reservation";

const router = createBrowserRouter([
  { path: '/', 
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Feed /> },
      { path: "reviewwrite", element: <ReviewWrite /> },
      { path: "리뷰", element: <ReviewList /> },
      { path: "저장", element: <Region /> },
      { path: "예약", element: <Reservation /> },
      { path: "피드", element: <Feed /> },
      { path:"login", element: <Login/> }
    ]
  }
]);

export default router;
