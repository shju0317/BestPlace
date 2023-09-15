import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@l/RootLayout";
import NotFound from "@p/NotFound";
import Feed from "@p/Feed";
import ReviewWrite from "@p/ReviewWrite";
import Region from "@p/Region";
import ReviewList from "@p/ReviewList";
import { pb } from "@/api/pocketbase";

// import Login from "@p/Login";
import Login from "@p/TestLogin";
// import Login from "@p/Register";

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
          { path: "리뷰", element: <ReviewList /> },
          { path: "저장", element: <Region /> },
          { path: "feed", element: <Feed /> },
        ],
      },
    ]
  : [
      {
        path: "/",
        element: <Login />,
      },
    ];

const router = createBrowserRouter(routerConfig);
export default router;
