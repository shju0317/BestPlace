import { createBrowserRouter } from "react-router-dom";
import { pb } from "@/api/pocketbase";
import RootLayout from "@l/RootLayout";
import ReservationWrite from "@p/ReservationWrite";
import UserReviewList from "@p/UserReviewList";
import UpdateUserData from "@p/UpdateUserData";
import ReviewWrite from "@p/ReviewWrite";
import Reservation from "@p/Reservation";
import UserReview from "@p/UserReview";
import Favorites from "@p/Favorites";
import MyReview from "@p/MyReview";
import NotFound from "@p/NotFound";
import Register from "@p/Register";
import Follow from "@p/Follow";
import Region from "@p/Region";
import Login from "@p/Login";
import Place from "@p/Place";
import Feed from "@p/Feed";


let isValidUser = pb.authStore.isValid;

const routerConfig = isValidUser
  ? [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Feed /> },
          { path: "my-review", element: <MyReview /> },
          { path: "reservation", element: <Reservation /> },
          { path: "favorite", element: <Favorites /> }
        ],
      },
      { path: "update-user-data", element: <UpdateUserData /> },
      { path: "place/:placeId/:recordId", element: <Place /> },
      { path: "user-review/:userId", element: <UserReview /> },
      { path: "user-review-list/:userId", element: <UserReviewList /> },
      { path: "region", element: <Region /> },
      { path: "review-write", element: <ReviewWrite /> },
      { path: "reservation-write", element: <ReservationWrite /> },
      { path: "follow", element: <Follow /> },
    ]
  : [
      {
        path: "/",
        children: [
          { index: true, element: <Login /> },
          { path: "register", element: <Register /> },
        ],
        errorElement: <NotFound />,
      },
    ];

const router = createBrowserRouter(routerConfig);
export default router;
