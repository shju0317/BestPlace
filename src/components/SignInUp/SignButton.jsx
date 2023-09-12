import { func, string } from 'prop-types';

function SignButton({ value, handleEvent }) {
  return (
    <button 
      className=''
      type="button"
      onClick={handleEvent}
    >
      {value}
    </button>
  );
}
SignButton.propTypes = {
  value: string,
  handleEvent: func
};

export default SignButton;
