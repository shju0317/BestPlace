import { string, func } from "prop-types";
import { useState } from "react";
import { pb, read } from "@/api/pocketbase";
import { getPbImageURL } from "./../../utils/getPbImageURL";
function SignInput({
  labelValue,
  ariaText,
  placeHolder,
  inputValue,
  bgColor = "bg-primary",
  textColor = "text-white",
  placeHolderColor = "placeholder-white",
}) {
  const [inputChange, setInputChange] = useState();
  const [fileUrl, setFileUrl] = useState(null);

  const handleChangeInput = ({ target }) => {
    // setInputChange(target.value);
    // inputValue(target.value);
    const selectedFile = target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);
    inputValue(selectedFile);
  };

  let pic = read("users", "", pb.authStore.model.id);

  return (
    <>
      <label className="" htmlFor="signInputId">
        {labelValue}
      </label>
      
      <div className="border">
        {fileUrl ? <img className="mx-5 mt-3 h-20 w-20 rounded-full" src={fileUrl} /> : null}
        <input
          type="file"
          accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
          onChange={handleChangeInput}
          value={inputChange}
          id="signInputId"
          className={`${textColor} ${bgColor} ${placeHolderColor} w-full rounded px-7 py-4 text-base`}
          aria-label={ariaText}
          placeholder={placeHolder}
        />
      </div>
    </>
  );
}
SignInput.propTypes = {
  labelValue: string,
  ariaText: string,
  placeHolder: string,
  inputValue: func,
  bgColor: string,
  textColor: string,
  placeHolderColor: string,
};

export default SignInput;
