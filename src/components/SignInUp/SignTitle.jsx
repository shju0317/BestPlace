import { string } from "prop-types";

function SignTitle({ value }) {
  return <h2 className="text-3xl">{value}</h2>;
}

SignTitle.propTypes = {
  value: string,
};

export default SignTitle;
