import React from 'react';
import axios from 'axios';
import Load from './Loader';
import {Table ,Button,InputGroup,InputGroupAddon,Input, InputGroupText} from 'reactstrap'
import validatePin from '../services/validatePin';
class searchDonor extends React.Component {
    state = {
        zipcode:'',
        table:false,
        inqueue:false,
        donors:[
            {
              distanceKM:'',
              FullName :'You',
              Contact:'',
              RegistrationDate:1,
              BloodGroup:'',
              Age:'',
              Sex:'',
              ZipCode:''
            }
          ],
    }
    pincode = (e) => {
        let code=e.target.value;
        this.setState({zipcode:code});
    }
    togglequeue =() => {
        this.setState({inqueue:!this.state.inqueue})
    }
    FindDonors = async () => {
        this.togglequeue();
        let status=await validatePin.validatePin(this.state.zipcode);
        console.log(status);
        if(status) {
            try { 
                const endpoint1='https://quiet-refuge-69287.herokuapp.com';
                const endpoint2='http://localhost:3001';
                var donorList=await  axios.get(endpoint1+'/searchDonor?pincode='+this.state.zipcode);
                
                donorList=donorList.data;
                this.setState({table:true});
                this.setState({donors:donorList});
            }
            catch(err) {
                this.setState({donors:[]});
                this.setState({table:false});
                console.log(err);
            }
        }
        else {
            this.setState({donors:[]});
            // console.log(this.state.donors.length);
            this.setState({table:false});
        }
        console.log(this.state.donors.length);
        this.togglequeue();
        // console.log(this.state.donors);
    }
    render() {
        const donors=this.state.donors;
        return (
            <div aria-multiselectable={true}
            className="card-collapse"
            id="accordion"
            role="tablist"
            style={{alignContent:'center',alignItems:'center',marginLeft:'35vh',marginTop:'10vh',marginRight:'35vh'}}>
                <h1>
                    Enter Pincode  to Find NearBy Donors.
                </h1>
                <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText  >
                              <i className="fa fa-key" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            onChange={this.pincode}
                            name="ListTopics"
                            placeholder="Enter Pincode here."
                            type="text"
                            disabled={false}
                            id='topicList'
                          />
                </InputGroup>
        <Button  color="secondary" onClick={this.FindDonors} outline
        disabled={this.state.inqueue}
        >
        <i className="fa fa-send "  />Find Donors 
        </Button>  
        {this.state.inqueue && <Load/>}

      
        {
        this.state.table  && donors.length>0 &&<Table responsive>
            <thead>
                <tr>
                    <th> Name </th>
                    <th> Gender </th>
                    <th className="text-center"> Contact </th>
                    <th className="text-center"> BloodGroup </th>
                    <th className="text-center"> Distance in KM</th>
                    <th className="text-center"> Age </th>
                    <th className="text-center"> Zipcode </th>
                </tr>
            </thead>
            <tbody>
                <>{

                    donors.map((donor) => {

                        return <tr>
                            <td>  {donor.FullName} </td>
                            <td>  {donor.Sex} </td>
                            <td className="text-center"> {donor.Contact} </td>
                            <td className="text-center"> {donor.BloodGroup} </td>
                            <td className="text-center"> {donor.distanceKM} </td>
                            <td className='text-center'>{donor.Age} </td>
                            <td className='text-center'>{donor.ZipCode} </td>
                        </tr>
                    })
                }
                </>
            </tbody>
        </Table>
    }
    {this.state.donors.length==0 && <h3> No Donor Found for this Area </h3>}
            </div>
        )
    }
}
export default searchDonor;