import { useParams } from "react-router";
import SHOP_DATA from "../../data/SHOP_DATA";
import CollectionItem from "../collection-item/CollectionItem";
import "./CategoryCollection.scss";
const CategoryCollection = () => {
  const { category } = useParams();
  const categoryCollection = SHOP_DATA[category];
  return (
    <div className="collection-page">
      <h2 className="title">{categoryCollection.title}</h2>
      <div className="items">
        {categoryCollection.items.map((item) => {
          return <CollectionItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default CategoryCollection;
