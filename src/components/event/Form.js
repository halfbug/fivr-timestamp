import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

class Form extends React.Component {
  state = {
    accessId: '',
    detail: '',
    speaker: '',
    title : ''

  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.saveEvent(this.state);
  }


  render() {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Event
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="accessId"
            name="accessId"
            label="Event ID"
            fullWidth
            autoComplete="accessId"
            value={this.state.accessId}
          onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            
            value={this.state.title}
          onChange={this.handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="detail"
            name="detail"
            label="Detail"
            fullWidth
            value={this.state.detail}
          onChange={this.handleChange}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="speaker"
            name="speaker"
            label="Speaker "
            fullWidth
            value={this.state.speaker}
          onChange={this.handleChange}
          />
        </Grid>
        
        <Grid item xs={24} sm={6} >
        <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Submit
                    </Button>
        </Grid>
      </Grid>


      
    </React.Fragment>
  );
}
}
export default Form;
