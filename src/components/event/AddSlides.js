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
// import FileUploader from "react-firebase-file-uploader";
import firebase from '../../config/fbConfig'
import 'firebase/storage';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IntegrationAutosuggest from './IntegrationAutosuggest';
import LinearProgress from '@material-ui/core/LinearProgress';
import { addEventSlide , createEvent } from '../../store/actions/eventActions';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },
  root: {
    flexGrow: 1,
  },
});

class AddSlides extends Component {
  state = {
    
    timestamp : '',
    isUploading: false,
    progress: 0,
    image: null,
    accessId :"",
    eventId:"",
    open: false,
    variant : "success",
    message : ""
    
  };

  handleChange = e => {
    if (e.target.files && true){
      console.log(e.target.files[0])
      const image = e.target.files[0]
      console.log(image)
      this.setState({
        image
      });
    }
    else
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state)
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleSubmit = e => {
    
    console.log(this.state);
    // console.log(this.props.getEventDocId(this.state.accessId));
    if(e)
    e.preventDefault();
// console.log("----------------")
// console.log(e.target.files[0])
// File or Blob named mountains.jpg
if(this.state.image && true){
  /// Create a root reference
  var storageRef = firebase.storage().ref();

var file = this.state.image

// Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(this.state.accessId+'/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    this.setState({progress});
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
  this.setState({
    open: true,
    variant : "error",
    message : error.code
  });
}, ()=> {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
    console.log('File available at', downloadURL);
    
    //automaticall add event
    if (this.state.image != null && this.state.timestamp !=null && this.state.accessId != null && this.state.eventId == null)
    this.props.createEvent({
      accessId : this.state.accessId,
      title: "auto generated",

    })
    // add path to selected slides collection in firebase
    this.props.addEventSlide({
      accessId: this.state.accessId,
      timestamp:(new Date(this.state.timestamp)),
      image : this.state.image.name,
      eventId: "events/"+this.state.eventId
    })

    this.setState({
      open: true,
      variant : "success",
      message : "Slide uploaded!!"
    });

  });
});
}
  }
  selectedEventId =(accessId)=> {
    const events = { ...this.props.events };
   const eventId=Object.keys(events).filter(key => {
    // console.log(events[key]);
    // console.log(accessId)
    // console.log (key)
    if (events[key].accessId === accessId) {
      console.log(key)
           return (key);
    }
    })[0];
    this.setState({accessId,eventId})
    // console.log(this.state)
  }

  
 
  render() {
    const { classes } = this.props;
    console.log(this.props);
    const events = { ...this.props.events };
    
    let suggestions = Object.keys(events).map(key => ({label:events[key].accessId, id:key}));
    
    return (
        <Single>
        <form onSubmit={this.handleSubmit} className={classes.container} noValidate>
        <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
        <IntegrationAutosuggest 
        id="accessId"
        onChange={this.handleChange} 
        selectedEventId={this.selectedEventId} 
        suggestionsList={suggestions}
        required
        error= "true"//{(this.state.eventId&&true)?"true":"false"}
        />
            </Grid>
        <Grid item xs={12}>


        <TextField
        id="timestamp"
        label="Timestamp"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        required
        onChange={this.handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>
        <Grid item xs={12}>

      <Input
        id="image"
        placeholder="Placeholder"
        type="file"
        required
        onChange={this.handleChange}
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
      </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Upload Slide
          </Button>
          <LinearProgress variant="determinate" color="secondary" value={this.state.progress} />
          </Grid>
          </Grid>
          </div>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          variant={this.state.variant}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">this.state.message</span>}
          action={[
            
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

      </Single>
    );
  }
}
 
AddSlides.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  // const accessId =(accId) => {accId};
  const events = state.firestore.data.events;
  // const event = events ? events[accessId] : null
  return {
    events: events,
    auth: state.firebase.auth,
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEventSlide: (slide) => dispatch(addEventSlide(slide)),
    createEvent: (event) => dispatch(createEvent(event))
    
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
  withRouter,
  withStyles(styles)
)(AddSlides);
 

// export default withStyles(styles)() ;


  // handleChangeUsername = event =>
  //   this.setState({ username: event.target.value });
  // handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  // handleProgress = progress => this.setState({ progress });
  // handleUploadError = error => {
  //   this.setState({ isUploading: false });
  //   console.error(error);
  // };
  // handleUploadSuccess = filename => {
  //   this.setState({ avatar: filename, progress: 100, isUploading: false });
  //   // firebase
    //   .storage()
    //   .ref("images")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url => this.setState({ avatarURL: url }));
  // };
 