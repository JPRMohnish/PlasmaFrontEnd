import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import routes1 from 'routes1.js';
import Thanks from "views/Thanks";
import SearchDonor from "views/searchDonor";
import RegisterDonor from "views/registerDonor";
import About from "views/About";
var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      sidebarMini: false,
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
    }
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/a") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
  };
  render() {
    return (
      <div>
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref="mainPanel">
          <AdminNavbar {...this.props} handleMiniClick={this.handleMiniClick} />
          <Switch>{this.getRoutes(routes1)}</Switch>
          {
            this.props.location.pathname.indexOf("full-screen-map") !==
              -1 ? null : (
              <div />
            )
          }
          {window.location.pathname === 'thanks' ? <Thanks /> : ""}
          {window.location.pathname === '/PlasmaDonor/searchDonor' ? <SearchDonor /> : ""}
          {window.location.pathname === '/PlasmaDonor/registerDonor' ? <RegisterDonor /> : ""}
          {window.location.pathname === '/PlasmaDonor/about' ? <About/> : ""}
        </div>

      </div>
    );
  }
}

export default Admin;
