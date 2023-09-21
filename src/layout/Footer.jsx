import { bool } from "prop-types";

function Footer({ isUser }) {
  return (
    <footer className={`grid w-full place-content-center bg-gray-200 p-10 ${isUser ? "absolute bottom-0" : ""}`}>
      <small className="text-base text-primary">
        Copyright &copy; <strong>Best Place</strong>
      </small>
    </footer>
  );
}

Footer.propTypes = {
  isUser: bool,
};

export default Footer;
