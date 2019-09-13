import React, { Component } from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from "../../assets/images/logo.svg"
import Single from './../dashboard/Single'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const styles = theme => ({
  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});



class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
    console.log(this.props)
    // console.log(state)
  }

  render () {
  const { classes } = this.props;
  const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 

  return (
    <Single>
        
        {/* <img src={logo} className="" alt="logo" width="116" height="116" align="center"/> */}
        
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
            </div>
        </form>
        </Single>
  );}
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}


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
  
  withStyles(styles)
)(SignIn);
