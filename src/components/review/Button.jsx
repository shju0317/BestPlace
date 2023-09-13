import { string, func } from 'prop-types';

function Button({text="버튼", type="button", bgColor="bg-primary", textColor="text-white", onClick}) {
  return (
    <button type={type} onClick={onClick} className={`${textColor} ${bgColor} font-semibold rounded shadow-sm shadow-slate-300 text-base px-7 py-3 w-full self-center`}>{text}</button>
  )
}

Button.propTypes = {
  text: string,
  type: string,
  bgColor: string,
  textColor: string,
  onClick: func
};

export default Button