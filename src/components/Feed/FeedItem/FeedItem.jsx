import { array, shape, string } from "prop-types";
import { getDate } from "@u";
import PhotoLayout from "./PhotoLayout";
import KeywordList from "./KeywordList";
import FeedItemHeader from "./FeedItemHeader";
import FeedItemFooter from "./FeedItemFooter";

function FeedItem({ item }) {
  return (
    <li className="flex flex-col gap-3 bg-white py-8">
      <FeedItemHeader item={item} />
      <figure>
        <PhotoLayout item={item} />
        <figcaption>
          <p className="mt-3  text-gray-700">{item.contents}</p>
        </figcaption>
      </figure>
      <div className="flex items-center justify-between">
        <ul className="flex gap-2">
          {item.keywords.map((item) => (
            <KeywordList key={crypto.randomUUID()} item={item} />
          ))}
        </ul>
        <time dateTime={item.created} className="text-sm text-gray-500">
          {getDate(item.created, "mm.dd day 방문")}
        </time>
      </div>
      <FeedItemFooter item={item} />
    </li>
  );
}

FeedItem.propTypes = {
  item: shape({
    contents: string,
    photos: array,
    keywords: array,
    created: string,
  }),
};

export default FeedItem;
