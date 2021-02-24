import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "../../features/home/HomeView";
import LoginView from "../../features/login/LoginView";
import ProductsView from "../../features/products/ProductsView";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LoginView} exact />
        <Route path="/home" component={HomeView} exact />
        <Route path="/products" component={ProductsView} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
