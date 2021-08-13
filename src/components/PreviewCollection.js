import React from "react";
import CollectionItem from "./collection-item/CollectionItem";
import "./PreviewCollection.scss";
const PreviewCollection = ({ title, items }) => {
  console.log("preview collection rerender");
  return (
    <div className="collection-preview">
      <h1 className="title">{title}</h1>
      <div className="preview">
        {items.slice(0, 4).map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(PreviewCollection);
