import { string, func } from "prop-types";
import { useState } from "react";

function SignInput({ labelValue, ariaText, placeHolder, inputValue }) {
  const [inputChange, setInputChange] = useState("");

  const handleChangeInput = ({ target }) => {
    setInputChange(target.value);
    inputValue(target.value);
  };

  return (
    <div className="">
      <label className="" htmlFor="signInputId">
        {labelValue}
      </label>
      <input
        id="signInputId"
        className="w-full rounded border px-7 py-4 text-base text-white bg-primary placeholder-white"
        type="text"
        aria-label={ariaText}
        placeholder={placeHolder}
        value={inputChange}
        onChange={handleChangeInput}
      />
    </div>
  );
}
SignInput.propTypes = {
  labelValue: string,
  ariaText: string,
  placeHolder: string,
  inputValue: func,
};

export default SignInput;
