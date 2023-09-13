import { string } from 'prop-types';

function Button({text="버튼", type="button", bgColor="bg-primary", textColor="text-white"}) {
  return (
    <button type={type} className={`${textColor} ${bgColor} font-semibold rounded shadow-sm shadow-slate-300 text-base px-7 py-3 w-full self-center`}>{text}</button>
  )
}

Button.propTypes = {
  text: string,
  type: string,
  bgColor: string,
  textColor: string
};

export default Button