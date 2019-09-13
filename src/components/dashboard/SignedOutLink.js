import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';

const SignedOutLinks = (props) => {
  return (
   <React.Fragment>
   <Link to="/" exact="true"><MenuItem onClick={props.handleClose}>Home</MenuItem></Link>
     <Link to="/signin"><MenuItem onClick={props.handleClose}>SignIn</MenuItem></Link></React.Fragment>
  )
}

export default SignedOutLinks