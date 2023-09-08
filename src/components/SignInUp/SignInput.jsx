import { string, func } from 'prop-types';
import { useState } from 'react';

function SignInput({ labelValue, ariaText, placeHolder }) {
  const [value, setValue] = useState();
  
  const handleChangeInput = ({ target }) => {
    setValue(target.value);
  };
  
  
  return (
    <div className="">
      <label className="">
        {labelValue}
      </label>
        <br/>
      <input 
        className="" 
        type="text" 
        aria-label={ariaText} 
        placeholder={placeHolder}
        value=''
        onChange={handleChangeInput}
      />
    </div>
  );
}
SignInput.propTypes = {
  labelValue: string,
  ariaText: string,
  placeHolder: string,
};

export default SignInput;
