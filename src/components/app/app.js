// Import components
import Products from "../products/products";
import Header from "../header/header";
import { Context } from "../../context/context";

import AddHeader from "../header/addHeader";
import AddProduct from "../addProducts/addProduct";
import { EditProducts } from "../editProducts/editProducts";

// Import React library
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <>
      <Context>
        <Router>
          <Switch>
            <Route exact path={"/"}>
              <Header />
              <Products />
            </Route>

            <Route exact path={"/add"}>
              <AddHeader />
              <AddProduct />
            </Route>

            <Route exact path={"/edit/:id"}>
              <AddHeader />
              <EditProducts />
            </Route>
          </Switch>
        </Router>
      </Context>
    </>
  );
};

export default App;
