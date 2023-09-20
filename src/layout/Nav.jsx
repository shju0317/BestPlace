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
    <nav className="sticky top-0 z-10 bg-primary">
      <ul className="mx-auto flex max-w-[400px] items-center justify-between">
        {NAV_MENU.map((item) => {
          return (
            <li key={crypto.randomUUID()}>
              <NavLink
                to={`/${item.url}`}
                className={({ isActive }) => {
                  const baseClassName = "p-2";
                  return isActive
                    ? `${baseClassName} block border-b-4 border-secondary pb-1 font-bold text-secondary`
                    : `${baseClassName} font-light text-gray-200`;
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
