import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Brand from "./Brand"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import RoutesCollection from "../RoutesCollection"

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import { Link } from "react-router-dom";
import  SignedInLink from './SignedInLinks'
import SignedOutLink from "./SignedOutLink"
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
    //   width: "95%",
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  headerContent :{
    zIndex:2,
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    paddingLeft: "1.625rem ",
    
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    fontFamily: "Candal"
  },
  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Master extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { auth, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const menuLinks = auth.uid ? <SignedInLink handleClose={this.handleClose}></SignedInLink> : <SignedOutLink handleClose={this.handleClose}></SignedOutLink>;
console.log(this.props)
    return (
     
      <div className={classes.root}>
        <CssBaseline />
        
    
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
  
            <Brand component="h1" variant="h6" color="inherit" align="left" />
            
            
            <IconButton color="inherit">
              
                <HelpOutlineIcon />
              
            </IconButton>
            
            <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>

            <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}>
            {menuLinks}
            </Menu>
            
         
            
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
  
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          
          <RoutesCollection></RoutesCollection>
         
         
        </main>
      </div>
    );
  }
}

Master.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  console.log(state)
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signIn: (creds) => dispatch(signIn(creds))
  }
}


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
  
  withStyles(styles)
)(Master);
