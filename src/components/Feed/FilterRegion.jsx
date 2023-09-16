import { string } from "prop-types";

function FilterRegion({ title }) {
  return (
    <li>
      <button className="rounded-md bg-gray-100 p-2 text-gray-500 shadow hover:bg-secondary hover:text-white">
        {title}
      </button>
    </li>
  );
}

FilterRegion.propTypes = {
  title: string,
};

export default FilterRegion;
