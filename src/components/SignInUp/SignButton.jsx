import { func, string } from "prop-types";

function SignButton({ value, handleEvent, bgColor = "bg-primary", textColor = "text-white" }) {
  return (
    <button
      className={`${textColor} ${bgColor} w-full rounded border px-7 py-4 text-base`}
      type="button"
      onClick={handleEvent}
    >
      {value}
    </button>
  );
}
SignButton.propTypes = {
  value: string,
  handleEvent: func,
  bgColor: string,
  textColor: string,
};

export default SignButton;
