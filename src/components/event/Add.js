import React, { Component } from 'react'
// import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import Form from './Form'
import Single from "../dashboard/Single"
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { createEvent } from "../../store/actions/eventActions";


export class Add extends Component {
  addevent = (event) => {
    
    
    this.props.createEvent(event);
    // console.log(this.props.state);
    this.props.history.push('/Search');
  }
  render() {
    const { authError, auth } = this.props;
    if (this.props.firebase.auth.uid) return <Redirect to='/signin' /> 
    return (
      <Single>
        <Form saveEvent={this.addevent} ></Form>
      </Single>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  // const accessId =(accId) => {accId};
  const events = state.firestore.data.events;
  // const event = events ? events[accessId] : null
  return {
    events: events,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  // return {
    createEvent: (event) => dispatch(createEvent(event))
  // };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "events"
    }
  ]),
  
)(Add);

