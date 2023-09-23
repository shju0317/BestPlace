import { PiArrowLineUpBold } from "react-icons/pi";

function ScrollTopButton() {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className="flex aspect-square w-11 items-center justify-center rounded-full bg-primary text-xl sm:w-[52px] sm:text-2xl"
      onClick={handleTop}
    >
      <PiArrowLineUpBold />
    </button>
  );
}

export default ScrollTopButton;
