import React, { Component } from "react";
import Single from "../dashboard/Single";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { signInAnonymously } from "../../store/actions/authActions";

class Select extends Component {
  state = {
    accessId: "",
    valid: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.events);

    const events = { ...this.props.events };
    // console.log("[0]"+events[0][0])
    console.log(Object.getOwnPropertyNames(events));
    let event = Object.keys(events).filter(key => {
      console.log(events[key].accessId);
      if (events[key].accessId === this.state.accessId) {
        this.setState({
          valid: false
        });
        return key;
      } else {
        this.setState({
          valid: true
        });

        return false;
      }
    });

    console.log(event);
    if (event.length > 0) {
     
      this.props.signInAnonymously();
      this.props.history.push("/clock/" + event);
    }
    else
    console.log(this.state)
  };

  render() {
    return (
      <Single>
        <form onSubmit={this.handleSubmit}>
          <FormControl
            margin="normal"
            required
            fullWidth
            onSubmit={this.handleSubmit}
            error={this.state.valid}
          >
            <InputLabel htmlFor="accessId">Event ID</InputLabel>
            <Input
              id="accessId"
              name="accessId"
              autoComplete="accessId"
              autoFocus
              onChange={this.handleChange}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary">
            I'm ready!
          </Button>
        </form>
      </Single>
    );
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
  return {
    signInAnonymously: () => dispatch(signInAnonymously())
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
  ]),
  withRouter
)(Select);
