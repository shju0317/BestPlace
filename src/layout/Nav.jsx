const NAV_MENU = ["피드", "방문", "리뷰", "예약", "저장"];

function Nav() {
  return (
    <nav className="sticky top-0 bg-primary text-gray-200">
      <ul className="mx-auto flex max-w-[400px] items-center justify-between">
        {NAV_MENU.map((item) => {
          return (
            <li key={crypto.randomUUID()} className="cursor-pointer px-3 py-4">
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
