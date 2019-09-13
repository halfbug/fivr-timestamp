import React from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from "react-router-dom";

class SignedInLinks extends React.Component {  
 handleSignOut =e => {
  e.preventDefault();
  this.props.signOut()
  // if(this.props.match.path != "/")
  this.props.history.push("/signin")
 }

 render() { return (
    <React.Fragment>
    <Link to="/" exact="true"><MenuItem onClick={this.props.handleClose}>Home</MenuItem></Link>
    <Link to="/event/add"><MenuItem onClick={this.props.handleClose}>Add Event</MenuItem></Link>
    <Link to="/event/myslides"><MenuItem onClick={this.props.handleClose}>My Slides</MenuItem></Link>
              <Link to="/event/addslide"><MenuItem onClick={this.props.handleClose}>Add Slide</MenuItem></Link>
              <a onClick={this.handleSignOut}><MenuItem onClick={this.props.handleClose}>SignOut</MenuItem></a>
    </React.Fragment>
  )}
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignedInLinks))