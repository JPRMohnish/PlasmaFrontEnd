/*!

=========================================================
* Paper Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="https://happycode.in" style={{fontSize:'20px'}}> Happy Code</a>
                </li>
                <li>
            <a href="https://linkedin.com/"><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i></a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                  >
                    <i class="fa fa-twitter fa-2x" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                  >
                    <i class="fa fa-instagram fa-2x" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                  >
                    <i class="fa fa-facebook fa-2x" aria-hidden="true"></i>
                  </a>
                  <a
                    href="mailto:anudeep2011@gmail.com"
                    target="_blank"
                  >
                    <i class="fa fa-envelope fa-2x" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto"  style={{fontSize:'16px'}}>
              <span className="copyright">
                &copy; {1900 + new Date().getYear()}, made with{" "}
                <i className="fa fa-heart heart fa-1x" /> by Happy Code
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
