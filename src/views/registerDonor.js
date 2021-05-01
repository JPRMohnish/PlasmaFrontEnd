import React from "react";
import Load from './Loader';
import {
  Button,
  Modal,
  Card,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown
} from "reactstrap";
import validatePin from '../services/validatePin';
class registerDonor extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    inqueue:false,
    horizontalTabs: "home",
      modalLogin: true,
      full:false,
      FullName:"",
      ZipCode:'',
      Contact:'',
      BloodGroup:'BloodGroup',
      Age:'',
      Sex:'Gender',
      Latitude:'',
      Longitude:'',
      logged:false,
      error:'',
      otperror:'',
      OTP:''
  }
  toggleModalLogin= () => {
    this.setState({
      modalLogin: !this.state.modalLogin
    });
  }
  togglequeue =() => {
    this.setState({inqueue:!this.state.inqueue})
  }
  validNum =(num) => {
    if(num.length==10 ) {
      for(let i=0;i<10;i++) {
        if(num[i]<'0' && num[i]>'9' ) return false;
      }
      return true;
    }
    return false;
  }
  validAge =(age) => {
    for(let i=0;i<age.length;i++) {
      if(age[i]<'0'&& age[i]>'9') return false;
    }
    return true;
  }
  
  clicklogin = async (e) => {

    this.togglequeue();
    let error='';
    if(!this.validNum(this.state.Contact)) {
      error+='\nInvalid Contact Number';
    }
    let x= await validatePin.validatePin(this.state.ZipCode);
    if(!x) error+='\n Invalid Pincode';
    if(!this.validAge(this.state.Age)) error+='\n Invalid Age';
    if(this.state.BloodGroup=='BloodGroup') error+='\n Invalid BloodGroup';
    if(this.state.Sex=='Gender') error+='\n Invalid Gender';
    if(this.state.FullName.length<4) error+='\n Too Small Name';
    this.setState({error:error});
    if(error.length>0) {
      this.togglequeue();
      return;
    }
    x=await validatePin.findLatitudeAndLongitude(this.state.ZipCode);
    this.setState({Latitude:x.Latitude});
    this.setState({Longitude:x.Longitude});

    /* API CALLS*/
    x=await validatePin.RegisterDonor({
      FullName:this.state.FullName,
      Email:'xx',
      Contact:this.state.Contact,
      Age:this.state.Age,
      Sex:this.state.Sex,
      BloodGroup:this.state.BloodGroup,
      ZipCode:this.state.ZipCode,
      Latitude:this.state.Latitude,
      Longitude:this.state.Longitude
    });
    if(!x||x[0]!='W') {
      this.setState({error:x});
      this.togglequeue();
      return;
    }

    this.setState({logged:true});
    this.setState({error:''});
    this.setState({ horizontalTabs: "otp" })
    console.log(this.state);
    this.togglequeue();
  }
  FullName = (e) => {
    this.setState({FullName:e.target.value});
  }
  ZipCode = (e) => {
    this.setState({ZipCode:e.target.value});
  }
  Contact= (e) => {
    this.setState({Contact:e.target.value});
  }
  BloodGroup =(e) => {
    this.setState({BloodGroup:e.target.innerText});
  }
  Age= (e) => {
    this.setState({Age:e.target.value});
  }
  Sex =(e) => {
    this.setState({Sex:e.target.innerText});
  }
  changeOTP =(e) => {
    this.setState({OTP:e.target.value});
  }
  OTPClick =async (e) => {
    this.togglequeue();
    let OTP=this.state.OTP;
    let oerror='';
    if(OTP.length<6) {
      oerror+='\n OTP Must be of 6 Digits.'
      this.setState({otperror:oerror});
      this.togglequeue();
      return;
    }
    for(let i=0;i<6;i++) {if(OTP[i]<'0' || OTP[i]>'9') {
      oerror+='\n OTP Must be of 6 Digits.'
      this.setState({otperror:oerror});
      this.togglequeue();
      return;
    }}
    /* API CALLS*/
    let x=await validatePin.VerifyDonor({
      contact:this.state.Contact,
      code:this.state.OTP
    });

    if(!x||x[0]!='D') {
      this.setState({otperror:x});
      this.togglequeue();
      return;
    }
    this.togglequeue();
    this.setState({otperror:''});
    this.setState({full:true});
  }
  render() {
    return (
         <div>
           <Button
                  block
                  className=" btn-secondary btn-round"
                  color="primary"
                  onClick={this.toggleModalLogin}>
                  Donate
            </Button>
         {!this.state.full && <Modal className="modal-login" modalClassName=" modal-primary" isOpen={this.state.modalLogin} toggle={this.toggleModalLogin} >
          <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <Nav id="tabs" role="tablist" tabs className="justify-content-center" responsive>
                        <NavItem>
                          <NavLink
                            aria-expanded={this.state.horizontalTabs === "home"}
                            data-toggle="tab"
                            href="#pablo"
                            role="tab"
                            className={
                              this.state.horizontalTabs === "home"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              this.setState({ horizontalTabs: "home" })
                            }
                          >
                           <i className="fa fa-sign-in" />
                          <strong style={{marginLeft:'5px'}}>Donate</strong>
                        </NavLink>
                        </NavItem>
                      </Nav>
                      {this.state.logged && <Nav id="tabs" role="tablist" tabs className="justify-content-center" responsive>
                        <NavItem>
                          <NavLink
                            aria-expanded={this.state.horizontalTabs === "otp"}
                            data-toggle="tab"
                            href="#pablo"
                            role="tab"
                            className={
                              this.state.horizontalTabs === "otp"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              this.state.logged && this.setState({ horizontalTabs: "otp" })
                            }
                          >
                           <i className="fa fa-sign-in" />
                          <strong style={{marginLeft:'5px'}}>OTP</strong>
                        </NavLink>
                        </NavItem>
                      </Nav>}
                    </div>
                  </div>
                  <TabContent
                    //className="text-center"
                    id="my-tab-content"
                    activeTab={this.state.horizontalTabs}
                  >
                    <TabPane tabId="home" role="tabpanel">
                    <Card className=" card-login card-plain">
              <div className=" modal-header justify-content-center">
                <button
                  aria-label="Close"
                  className=" close"
                  data-dismiss="modal"
                  type="button"
                  onClick={this.toggleModalLogin}
                >
                  <span aria-hidden={true}>×</span>
                </button>
                <div className=" header header-primary text-center">
                  <div className=" logo-container">
                    <img
                      alt="..."
                      src={require("assets/img/login2.png")}
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>
              </div>
              <div className=" modal-body">
                <Form action="" className="login form" method="">
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText >
                          <i className=" nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.FullName} 
                        name="FullName"
                        placeholder="Fullname"
                        type="text"
                        disabled={((this.state.logged) ? 'disabled' : '')}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText  >
                        <i className="fa fa-key" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.ZipCode}
                        name="Zip Code"
                        placeholder="ZipCode eg. 458001"
                        type="number"
                        disabled={((this.state.logged) ? 'disabled' : '')}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText  >
                        <i className="fa fa-phone" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.Contact}
                        name="Contact"
                        placeholder="Contact Number eg. 98268XXXXX"
                        type="number"
                        disabled={((this.state.logged) ? 'disabled' : '')}
                      />
                      <p style={{ color: 'green' }}>{"Note:- Number will be public. Enter as per your Privacy."}</p>
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText  >
                        <i className="fa fa-birthday-cake"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.Age}
                        name="Age"
                        placeholder="Age in Years eg.69"
                        type="number"
                        disabled={((this.state.logged) ? 'disabled' : '')}
                      />
                    </InputGroup>
                  <UncontrolledButtonDropdown>
                    <DropdownToggle caret className="dropdown-toggle-split" color="secondary" >
                     {this.state.Sex}
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem  onClick={this.Sex} >Male</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.Sex} >Female</DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>

                <UncontrolledButtonDropdown>
                    <DropdownToggle caret className="dropdown-toggle-split" color="secondary" >
                     {this.state.BloodGroup}
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem  onClick={this.BloodGroup} >A+</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.BloodGroup} >A-</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.BloodGroup} >B+</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.BloodGroup} >B-</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.BloodGroup} >O+</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.BloodGroup} >O-</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.BloodGroup} >AB+</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem  onClick={this.BloodGroup} >AB-</DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
                  </CardBody>
                </Form>
                <InputGroup>
                <p style={{ color: 'red' }}>{this.state.error}</p>
                </InputGroup>
              </div>
              <div className=" modal-footer text-center">
                <Button
                  block
                  className=" btn-neutral btn-round"
                  color="default"
                  onClick={this.clicklogin}
                  disabled={this.state.logged || this.state.inqueue}
                  >
                  Donate
                </Button>
                {this.state.inqueue &&<Load/>}
              </div>
              </Card>
              </TabPane>
              </TabContent>
              <TabContent
                    //className="text-center"
                    id="my-tab-content"
                    activeTab={this.state.horizontalTabs}
                  >
                    <TabPane tabId="otp" role="tabpanel">
                    <Card className=" card-login card-plain">
                    <div className=" modal-header justify-content-center">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText  >
                        <i className="fa fa-key" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.changeOTP}
                        name="OTP Code"
                        placeholder="OTP. 458001"
                        type="number"
                        disabled={((this.state.full) ? 'disabled' : '')}
                      />
                    </InputGroup>  
                    <InputGroup>
                    <p style={{ color: 'red' }}>{this.state.otperror}</p>
                    </InputGroup>
                    </div>
                <div className=" modal-footer text-center">
                <Button
                  block
                  className=" btn-neutral btn-round"
                  color="default"
                  onClick={this.OTPClick}
                  disabled={this.state.full|| this.state.inqueue}
                  >
                  Verify
                </Button>
                {this.state.inqueue &&<Load/>}
              </div>
                    </Card>
                    </TabPane>
                    </TabContent>
          </Modal>}
          {this.state.full && <h3>Thanks  for your Your Contribution in fighting with Covid 19 . God Bless You!</h3>}
        </div>
    );
  }
}

export default registerDonor;

