import Nav from "./Nav";
import Header from "./header";
import { node } from "prop-types";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <Header />
      <Nav />
      <main className="mx-auto max-w-3xl p-3"><Outlet/></main>
    </div>
  );
}

RootLayout.propTypes = {
  children: node.isRequired,
};

export default RootLayout;
