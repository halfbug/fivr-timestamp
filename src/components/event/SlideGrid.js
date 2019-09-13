import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import SaveAlt from '@material-ui/icons/SaveAlt';
// import tileData from './tileData';
import { connect } from "react-redux";
import { firestoreConnect,firebaseConnect } from 'react-redux-firebase'
import { compose } from "redux";
import firebase from '../../config/fbConfig'
import 'firebase/storage';
import CircularProgress from '@material-ui/core/CircularProgress';
import Single from "../dashboard/Single";
import moment from 'moment'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class SlideGrid extends Component {
  constructor(props) {
    super(props);
  this.state= {
    slides : [],
    
  }
  }
  componentDidMount() {
    // const firestore = this.props.firestore.getFirestore();
    
    const listslides = this.props.firestore.collection('selectedSlides')
    .where("uid","==",this.props.auth.uid)
    .get().then((querySnapshot)=> {
      // let evntl=[];
      
// console.log(querySnapshot)
      querySnapshot.forEach((etimestamp)=> {
          // doc.data() is never undefined for query doc snapshots
          console.log(etimestamp.id, " => ", etimestamp.data().slideId);
          let getSlide = this.props.firestore.collection('slides').doc(etimestamp.data().slideId).get()
          .then((doc)=>{
            
            if (doc.exists) {
              // console.log("Document data:", doc);
              
              // // Points to the root reference
                var storageRef = firebase.storage().ref();
                // Create a reference to the file whose metadata we want to retrieve
                var slideRef = storageRef.child(doc.data().accessId+"/"+doc.data().image);


              slideRef.getDownloadURL().then((url)=> {
                // var test = url;
                console.log(url);
                var slide = {
                  id : etimestamp.data().slideId,
                  img : url,
                  date : moment(doc.data().timestamp.toDate()).format("MMM Do YY"),//doc.data().timestamp,
                  time : moment(doc.data().timestamp.toDate()).format("h:mm:ss a")
                }

              this.setState({
                slides: [...this.state.slides, slide]
              })

              // console.log(this.state)
              //
   
            }).catch(function(error) {
   
            });

                
              // console.log(this.props.cevent.accessId)
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
          //  evntl=(etimestamp.data().eventId)
        
        

        
      });
      
      
      
      

    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
//  console.log(myevents)}
  
  }

 



  render() {
    const { classes , cevent} = this.props;
    // console.log("event")
    console.log(typeof(cevent))
    

    if(this.state.slides.length<1 && cevent != null)
     return (
      <Single>
          <h4>{cevent.accessId}</h4>
          <CircularProgress />
        
      </Single>
    );
    else if(cevent != null) {
    return (
      <Single>
      <h4>{cevent.accessId}</h4>
      <GridList cellHeight={180} >
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
       {this.state.slides.map(tile => (
          <GridListTile key={tile.id}>
            <img src={tile.img} alt={tile.date} />
            <GridListTileBar
              title={tile.date}
              subtitle={<span>at: {tile.time}</span>}
              actionIcon={
                <IconButton href={tile.img} target="_blank"  >
                  <SaveAlt />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
        
        </GridList>
      </Single>
    )
    }
    else{
      return(<Single></Single>)
    }


  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  // const accessId =(accId) => {accId};
  const events = state.firestore.data.events;
  const cevent = events ? events[ownProps.match.params['eventId']] : null;
  // const 
  
  return {
    cevent: cevent,
    auth: state.firebase.auth,
    // selectedSlides: state.firestore.data.selectedSlides
    // accessId: event.accessId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // signInAnonymously: () => dispatch(signInAnonymously())
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
  
)(SlideGrid)
