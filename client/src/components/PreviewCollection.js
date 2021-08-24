import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CollectionItem from "./collection-item/CollectionItem";
import "./PreviewCollection.scss";
const PreviewCollection = ({ title, items }) => {
  const { path } = useRouteMatch();
  // console.log(route);
  console.log("preview collection rerender");
  console.log(title, items);
  return (
    <div className="collection-preview">
      <Link to={`${path}/${title.toLowerCase()}`} className="title">
        {title}
      </Link>
      <div className="preview">
        {items.slice(0, 4).map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PreviewCollection;
