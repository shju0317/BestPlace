import Footer from "./Footer";
import Nav from "./Nav";
import Header from "./header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <h1 className="sr-only">베스트 플레이스</h1>
      <Header />
      <Nav />
      <main className="mx-auto max-w-3xl p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
