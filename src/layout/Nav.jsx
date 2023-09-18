import { NavLink } from "react-router-dom";

const NAV_MENU = [
  { title: "피드", url: "feed" },
  { title: "방문", url: "visit" },
  { title: "리뷰", url: "review" },
  { title: "예약", url: "reserve" },
  { title: "저장", url: "favorite" },
];

function Nav() {
  return (
    <nav className="sticky top-0 z-10 bg-primary text-gray-200">
      <ul className="mx-auto flex max-w-[400px] items-center justify-between">
        {NAV_MENU.map((item) => {
          return (
            <li key={crypto.randomUUID()} className="cursor-pointer px-3 py-4">
              <NavLink to={`/${item.url}`}>{item.title}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
