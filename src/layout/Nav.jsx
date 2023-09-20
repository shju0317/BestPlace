import { NavLink } from "react-router-dom";

const NAV_MENU = [
  { title: "피드", url: "feed" },
  { title: "방문", url: "visit" },
  { title: "리뷰", url: "my-review" },
  { title: "예약", url: "reservation" },
  { title: "저장", url: "favorite" },
];

function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-gray-800 bg-[#f9f9f9] shadow-md my-4">
      <ul className="mx-auto flex max-w-2xl items-center justify-around py-4 text-lg">
        {NAV_MENU.map((item) => {
          return (
            <li key={crypto.randomUUID()}>
              <NavLink
                to={`/${item.url}`}
                className={({ isActive }) => {
                  const baseClassName = "px-1";
                  return isActive
                    ? `${baseClassName} box-border block border-b-2 border-primary font-bold text-primary`
                    : `${baseClassName} text-secondary`;
                }}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
