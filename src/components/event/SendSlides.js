import React, { Component } from "react";
import Single from "../dashboard/Single";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Recaptcha from "react-recaptcha"

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { anonymousTopermanentUser } from "../../store/actions/authActions";
import { emailPassword , emailSelectedSlides } from "../../model/email"
import { Redirect } from 'react-router-dom'




export class SendSlides extends Component {
    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value
        });
      };

       makePassword(){
        var longth = 7,
        allc = "!@#$%^&*()_+~`|}{[]\:;?><,./-=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        passgen = '';
        for (var i = 0; i < longth; i++) {
          passgen += allc[Math.floor(Math.random() * allc.length)];
        }
        return passgen;
      }
      handleSubmit = e => {
        e.preventDefault();
        
        if (this.props.firebase.auth.isAnonymous) {
          let newUser = {
            email : this.state.email,
            password : this.makePassword()
          }
          console.log(newUser)
        this.props.anonymousTopermanentUser(newUser).then(resp => {
           console.log(resp);
           emailPassword(newUser.email)
          
           
          
          })
        }
        // Add and email selected slides
        // emailSelectedSlides(this.state.email)
        // get all event id and add it to database.
        
        this.props.history.push("/event/rate");
      }  
      
      recaptchaLoaded = () => { console.log("recaptcha loaded") }    

  render() {
    const eventTS=this.props.event
    if (this.props.firebase.auth.uid) return <Redirect to='/signin' />  
    return (
      <Single>
          <h1>You have chose {eventTS+1} timestamps !</h1>
          {/* <p> As soon they're ready, we'll send them to:</p> */}
          <p> Please provide email address to save them! </p>
        <form onSubmit={this.handleSubmit}>
          <FormControl
            margin="normal"
            required
            fullWidth
            
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
          </FormControl>
          <Recaptcha
    sitekey="6LftEp4UAAAAAOJoddCoFAPkfdaqa5ZjenwlqF1J"
    render="explicit"
    onloadCallback={this.recaptchaLoaded}
  />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save them!
          </Button>
        </form>
      </Single>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  
  return {
    event: state.event.timestampCounter,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {

  return {
    anonymousTopermanentUser: (anonoUser) => dispatch(anonymousTopermanentUser(anonoUser)),


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
  
) (SendSlides)

  