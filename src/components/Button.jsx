import { string, func, bool } from 'prop-types';

function Button({text="버튼", type="button", bgColor="bg-primary", textColor="text-white", onClick, disabled}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${textColor} ${bgColor} font-semibold rounded shadow-sm shadow-slate-300 text-base px-7 py-3 w-full self-center`}>{text}</button>
  )
}

Button.propTypes = {
  text: string,
  type: string,
  bgColor: string,
  textColor: string,
  onClick: func,
  disabled: bool,
};

export default Button