import { useState } from "react";
import PreviewCollection from "../components/PreviewCollection";
import { Route, Switch, useRouteMatch } from "react-router";
import CategoryCollection from "../components/category-collection/CategoryCollection";
import SHOP_DATA from "../data/SHOP_DATA";
const ShopPage = () => {
  const { path } = useRouteMatch();
  // const [collections, setCeollections] = useState(SHOP_DATA);
  return (
    <Switch>
      <Route exact path={path}>
        {Object.keys(SHOP_DATA).map((key, i) => (
          <PreviewCollection key={SHOP_DATA[key].id} {...SHOP_DATA[key]} />
        ))}
      </Route>
      <Route path={`${path}/:category`}>
        <CategoryCollection />
      </Route>
    </Switch>
  );
};

export default ShopPage;
