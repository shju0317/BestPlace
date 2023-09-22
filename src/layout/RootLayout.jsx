import Profile from "@/components/Profile";
import Footer from "./Footer";
import Nav from "./Nav";
import Header from "./header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="relative">
      <Header />
      <div className="relative bg-gray-50">
        <Profile />
      </div>
      <Nav />
      <main className="mx-auto max-w-3xl p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
