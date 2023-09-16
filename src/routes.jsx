import { createBrowserRouter } from "react-router-dom";
import { pb } from "@/api/pocketbase";
import RootLayout from "@l/RootLayout";
import NotFound from "@p/NotFound";
import Feed from "@p/Feed";
import ReviewWrite from "@p/ReviewWrite";
import Region from "@p/Region";
import ReviewList from "@p/ReviewList";
import Reservation from "./pages/Reservation";
import UpdateUserData from "@p/UpdateUserData";
import Login from "@p/Login";
import Register from "@p/Register";

let isValidUser = pb.authStore.isValid;

const routerConfig = isValidUser
  ? [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Feed /> },
          { path: "reviewwrite", element: <ReviewWrite /> },
          { path: "피드", element: <Feed /> },
          { path: "리뷰", element: <ReviewList /> },
          { path: "저장", element: <Region /> },
          { path: "예약", element: <Reservation /> },
          { path: "updateUserData", element: <UpdateUserData /> },
        ],
      },
    ]
  : [
      {
        path: "/",
        children: [
          { index: true, element: <Login /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
    ];

const router = createBrowserRouter(routerConfig);
export default router;
