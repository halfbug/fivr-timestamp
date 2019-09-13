import React, { Component } from 'react'
import Single from '../dashboard/Single'
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { saveSelectedSlide,  timestampCounter } from "../../store/actions/eventActions";
import Chip from '@material-ui/core/Chip';
import { Redirect } from 'react-router-dom'



export class Clock extends Component {
  state = {
    countTimeStamp : 0
    
  };


  handleTimestamp = (e) => {
// console.log(e.target.parentElement.id)

let iscurrent =(e.target.id == "current" || e.target.parentElement.id == "current")?true:false
// console.log("you clicked : "+ [e.target.id])
// console.log(iscurrent)
const selectedTimestamp={
  eventId: this.props.match.params.eventId,
  timestamp : (iscurrent)?new Date(Date.now()):new Date(Date.now() - 5000),
  userId : this.props.auth.uid
  
};
// console.l og(selectedTimestamp)
this.props.saveSelectedSlide(selectedTimestamp)
let nextnum=  Number(this.state.countTimeStamp)+1
this.setState({
  countTimeStamp: nextnum
});
this.props.timestampCounter(this.state.countTimeStamp)
  }

  FinishedClicked= (e) => {
    this.props.history.push("/event/sendSlides/"+this.props.match.params.eventId);

  }

  render() {
    if (this.props.firebase.auth.uid) return <Redirect to='/signin' />    
    return (
      <Single>
          <span></span>
          <Grid container spacing={24} className="clock">
        <Grid item xs={12} >
          
      <Fab variant="extended" aria-label="Delete" id="current" style={{height: '135px'}} onClick={this.handleTimestamp}>
        
       
        I want this Slide!
      </Fab>
         
        
        </Grid>
        <Grid item xs={12} >
        <Fab variant="extended" aria-label="back" id="subfive" color="secondary" onClick={this.handleTimestamp}  >
       
        
         last 5s
      </Fab>
        </Grid>
        <Grid item xs={12} >
        <Chip
                label={this.state.countTimeStamp}
                color="default"
                variant="outlined"
                 
              />
        </Grid>

        <Grid item xs={12} >
        <Button
                      variant="contained"
                      color="primary"
                      onClick = {this.FinishedClicked}
                      
                    >
                      I'm Finished
                    </Button>
        </Grid>
        </Grid>
         
      </Single>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  
  return {
    
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveSelectedSlide: (slideInfo) => dispatch(saveSelectedSlide(slideInfo)),
    timestampCounter : (data) => {
      console.log(data)
      return dispatch(timestampCounter(data))}

  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "events"
      
    }
  ])
  
)(Clock)
