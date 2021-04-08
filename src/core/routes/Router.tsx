import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CarouselView from "../../features/carousel/CarouselView";
import CategoryView from "../../features/category/CategoryView";
import ConfigView from "../../features/config/ConfigView";
import DishesByCategoryView from "../../features/dishes-by-category/DishesByCategoryView";
import GalleryView from "../../features/gallery/GalleryView";
import HomeView from "../../features/home/HomeView";
import LoginView from "../../features/login/LoginView";
import OrderView from "../../features/order/OrderView";
import PageView from "../../features/page/PageView";
import ProductsView from "../../features/products/ProductsView";
import PromoView from "../../features/promo/PromoView";
import LocalStorageService from "../services/LocalStorageService";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          render={() =>
            LocalStorageService.getAccessToken() ? (
              <Redirect push={false} to="/home" />
            ) : (
              <Redirect push={false} to="/login" />
            )
          }
          exact
        />
        <Route path="/login" component={LoginView} exact />
        <Route path="/home" component={HomeView} exact />
        <Route path="/categories" component={CategoryView} exact />
        <Route path="/orders" component={OrderView} exact />
        <Route path="/categories/:id" component={DishesByCategoryView} exact />
        <Route path="/products" component={ProductsView} exact />
        <Route path="/config" component={ConfigView} exact />
        <Route path="/gallery" component={GalleryView} exact />
        <Route path="/carousel" component={CarouselView} exact />
        <Route path="/page" component={PageView} exact />
        <Route path="/promo" component={PromoView} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
