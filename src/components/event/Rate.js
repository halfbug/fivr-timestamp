import React, { Component } from "react";
import Single from "../dashboard/Single";
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
// import { Rating } from 'material-ui-rating'

export class Rate extends Component {
  render() {
    return (
      <Single>
          <h1>Done!</h1>
          {/* <p> Youre favorites will be delivered straight to your inbox soon!</p> */}
         <p> Yours favorites are saved in <Link to="/event/myslides">MySlides</Link></p>
        <form onSubmit={this.handleSubmit}>
        <h5>Did you like the presentation?</h5>
        <TextField
          id="outlined-name"
          label="Comments"
          
          margin="normal"
          variant="outlined"
        />
          
        </form>
      </Single>
    )
  }
}

export default Rate
