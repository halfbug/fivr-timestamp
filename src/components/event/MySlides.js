import React, { Component } from 'react'
import Single from "../dashboard/Single";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import { connect } from "react-redux";
import { firestoreConnect,firebaseConnect, populate } from 'react-redux-firebase'
import { compose } from "redux";
import firebase from '../../config/fbConfig'
import 'firebase/storage';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";
// import SlideGrid from "./SlideGrid"


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class MySlides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myevents: [],
      selectedIndex: 1,
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };
   componentDidMount() {
    // const firestore = this.props.firestore.getFirestore();
    
    const myeventslist = this.props.firestore.collection('selectedTimestamp')
    .where("userId","==",this.props.auth.uid)
    .get().then((querySnapshot)=> {
      // let evntl=[];
      var evntl = [];

      querySnapshot.forEach(function(etimestamp) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(etimestamp.id, " => ", etimestamp.data().eventId);
        //  evntl=(etimestamp.data().eventId)
        
        evntl.push(etimestamp.data().eventId)

        
      });
      const myevents = [... new Set(evntl)]
      console.log(myevents)
      this.setState({myevents});
      console.log(this.state)
      

    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
//  console.log(myevents)
  }



    render(){
    const { classes } = this.props;
    const { myevents } = this.state
    console.log("---")
    console.log(this.props)
    // const slidedata= this.mySlides()
    // console.log(slidedata)
    if(this.state.myevents.length<1)
     return (
      <Single>
          <h3>Events</h3>
          <CircularProgress className={classes.progress} />
        
      </Single>
    );
    else {
      return (
        <Single>
            <h3>Events</h3>
            
            <List component="nav">
            {myevents.map((evn)=>(  
              <Link to={"/event/slides/" + evn} key={evn}>
        <ListItem 
        
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
          >  
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>   
            <ListItemText primary={this.props.events[evn].accessId} />
        </ListItem>
        </Link>
      ))}
      </List>
          
        </Single>
      );
    }
  }
}
  
  MySlides.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const populates = [
    { child: 'uid', root: 'users' },
    // {  child : "slideId", root: 'slides'} // replace owner with user object
  ]
  const mapStateToProps = (state, firebase ) => {
    console.log(state);
    // const accessId =(accId) => {accId};
    const events = state.firestore.data.events;
    const stimestamp = state.firestore.data.selectedTimestamp
    // const event = events ? events[accessId] : null
    
    return {
      selectedSlides: populate(firebase, 'selectedSlides', populates),
      auth: state.firebase.auth,
      stimestamp : stimestamp,
      events : events
      
     
    };
  };
  
    
  export default compose(
    connect(
      mapStateToProps,
  
    ),
    firestoreConnect([
      {
        collection: "events",
        //  path: 'selectedSlides', populates 
      }
    ]),
    
    withStyles(styles)
  )(MySlides);
  
  

