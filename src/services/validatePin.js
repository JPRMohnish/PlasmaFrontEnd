const axios=require('axios');
let endpoint1='https://quiet-refuge-69287.herokuapp.com';
let endpoint2='http://localhost:3001';
[endpoint2,endpoint1]=[endpoint1,endpoint2];
const validatePin = {
validatePin :async (pincode) => {
    try {
        const response=await axios.get(endpoint2+'/verifyPin?pincode='+pincode);
        if(response.data.name=='Error') return false;
        if(response.data.places.length>0)
            return true;
        else return false;
    }
    catch(err) {
        console.log(err);
        return false;
    }
} ,
findLatitudeAndLongitude :async (pincode) => {
    try {
        const response=await axios.get(endpoint2+'/verifyPin?pincode='+pincode);
        console.log(response.data);
        return { Latitude:response.data.places[0].latitude, Longitude:response.data.places[0].longitude};
    }
    catch(err) {
        console.log(err);
        return false;
    }
},
RegisterDonor :async (donor) => {
    try {
        const response=await axios.post(endpoint2+'/registerDonor',donor);
        console.log(response.data);
        return response.data;
    }
    catch(err) {
        console.log(err);
        return "Some error Occured";
    }
},
 VerifyDonor: async (donor) => {
    try {
        const response=await axios.post(endpoint2+'/verifyDonor',donor);
        console.log(response.data);
        return response.data;
    }
    catch(err) {
        console.log(err);
        return "Some error Occured";
    }
}
}
export default validatePin;