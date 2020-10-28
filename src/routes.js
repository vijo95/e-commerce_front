import React from "react";
import { Switch, Route } from "react-router-dom";
import Hoc from "./hoc";

import Home from './container/pages/Home/Home'
import Products from './container/pages/Products/Products'
import Checkout from './container/pages/Checkout/Checkout'
import Payment from './container/pages/Payment/Payment'

const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/products/" component={Products} />
      <Route exact path="/checkout/" component={Checkout} />
      <Route exact path="/payment/" component={Payment} />
    </Switch>
  </Hoc>
)

export default BaseRouter;