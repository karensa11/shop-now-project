import React, {useEffect} from 'react';
import './App.css';
import * as actions from "../server/actions";
import {connect} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import CatalogPage from "./pages/catalog-page/catalog-page";
import ShoppingCartPage from "./pages/shopping-cart-page/shopping-cart-page";
import SearchResultsPage from "./pages/search-results-page/search-results-page";
import LoginPage from "./pages/login-page/login-page";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../redux/general/general-selector";
import RegisterPage from "./pages/register-page/register-page";

function App({currentUser, retrieveCategories}){
  useEffect(() => {
      retrieveCategories();
  }, []);
  return (
      <div className="app-component">
          <Switch>
              <Route exact path="/" component={CatalogPage} />
              <Route exact path="/cart" component={ShoppingCartPage}/>
              <Route path={"/search"} component={SearchResultsPage} />
              <Route path={"/signIn"} render={(props) => {
                  return (
                      currentUser ?
                          <Redirect to="/" /> : <LoginPage {...props} />
                  )
              }} />
              <Route path={"/register"} render={(props) => {
                  return (
                      currentUser ?
                          <Redirect to="/" /> : <RegisterPage {...props} />
                  )
              }} />
          </Switch>
      </div>
    );
}
const mapStateToProps = createStructuredSelector({
   currentUser: currentUserSelector
});
const mapDispatchToProps = (dispatch) => ({
    retrieveCategories: () => dispatch(actions.retrieveCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
