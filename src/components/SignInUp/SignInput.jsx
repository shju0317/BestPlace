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
      <label className="">{labelValue}</label>
      <br />
      <input
        className=""
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
