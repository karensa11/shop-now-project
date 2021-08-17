import {Component} from 'react';
import './App.css';
import * as actions from "../server/actions";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import CatalogPage from "./pages/catalog-page/catalog-page";
import ShoppingCartPage from "./pages/shopping-cart-page/shopping-cart-page";
import SearchResults from "./pages/search-results-page/search-results-page";

class App extends Component{
  componentDidMount() {
      this.props.retrieveCategories();
  }
  render() {
    return (
        <div className="app-component">
          <Switch>
              <Route exact path="/" component={CatalogPage} />
              <Route exact path="/cart" component={ShoppingCartPage}/>
              <Route path={"/search"} component={SearchResults} />
          </Switch>
        </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
    retrieveCategories: () => dispatch(actions.retrieveCategories())
});

export default connect(null, mapDispatchToProps)(App);
