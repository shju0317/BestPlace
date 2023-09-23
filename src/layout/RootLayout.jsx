import Profile from "@/components/Profile";
import Footer from "./Footer";
import Nav from "./Nav";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import ScrollTopButton from "@/components/Button/ScrollTopButton";
import ReviewWriteLink from "@/components/Link/ReviewWriteLink";

function RootLayout() {
  return (
    <div className="relative min-h-screen pb-28">
      <Header />
      <div className="relative bg-gray-50">
        <Suspense fallback={<Spinner size={50} />}>
          <Profile />
        </Suspense>
      </div>
      <Nav />

      <main className="mx-auto max-w-3xl p-3">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 text-white">
        <ScrollTopButton />
        <ReviewWriteLink />
      </div>
    </div>
  );
}

export default RootLayout;
