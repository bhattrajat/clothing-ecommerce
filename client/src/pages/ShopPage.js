import { useEffect, useState } from "react";
import PreviewCollection from "../components/PreviewCollection";
import { Route, Switch, useRouteMatch } from "react-router";
import CategoryCollection from "../components/category-collection/CategoryCollection";
import SHOP_DATA from "../data/SHOP_DATA";
import { firestore } from "../firebase/utils";
import Spinner from "../components/spinner/Spinner";
const ShopPage = () => {
  const { path } = useRouteMatch();
  const [shopData, setShopData] = useState();

  useEffect(() => {
    let unsubscribe;
    try {
      const shopDataRef = firestore.collection("shopitems");
      // unsubscribe = shopDataRef.onSnapshot((querySnapShot) => {
      shopDataRef.onSnapshot((querySnapShot) => {
        const shopItems = {};
        querySnapShot.forEach((doc) => {
          const { title, items } = doc.data();
          shopItems[title.toLowerCase()] = {
            title,
            id: doc.id,
            items,
            routeName: encodeURI(title.toLowerCase()),
          };
        });
        console.log("shopItems", shopItems);
        setShopData(shopItems);
      });
    } catch (error) {
      console.log(error);
    }
    // return unsubscribe;
  }, []);
  // const [collections, setCeollections] = useState(SHOP_DATA);
  if (!shopData) {
    return <Spinner />;
  }
  return (
    <>
      <Switch>
        <Route exact path={path}>
          {Object.keys(shopData).map((key) => (
            <PreviewCollection key={shopData[key].id} {...shopData[key]} />
          ))}
        </Route>
        <Route path={`${path}/:category`}>
          <CategoryCollection collection={shopData} />
        </Route>
      </Switch>
    </>
  );
};

export default ShopPage;
