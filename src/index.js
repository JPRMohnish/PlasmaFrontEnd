import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import searchDonor from './views/searchDonor'
import Thanks from './views/Thanks';
import registerDonor from './views/registerDonor';
import About from './views/About';
const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch> 
    {/* <Route exact path='/thanks' component={Thanks}/>
    <Route exact path='/PlasmaDonor/searchDonor' component ={searchDonor}/>
    <Route exact path='/PlasmaDonor/registerDonor' component={registerDonor}/>
    <Route exact path='/PlasmaDonor/about' component={About}/> */}
    <Route path="/" render={(props) => <AdminLayout {...props} />} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
