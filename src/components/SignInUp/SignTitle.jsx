import { string } from 'prop-types';

function SignTitle({ value }) {
  return (
    <>
      <h2 className="text-xl">{value}</h2>
      <br />
    </>
  );
}


SignTitle.propTypes = {
  value: string,
};

export default SignTitle;
