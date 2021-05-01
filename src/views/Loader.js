import React from 'react';
import { Spinner } from 'reactstrap';

const Load = (props) => {
  return (
    <div  className='content' style={{alignContent:'center'}}>
    <Spinner color="secondary" />
    </div>
  );
}

export default Load;
