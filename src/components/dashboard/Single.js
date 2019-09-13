import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root:{
    width: '100%',
    padding : 1,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    paddingTop: 3,
  },
  section2: {
    margin: theme.spacing.unit * 2,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
});

function Single(props) {
  const { classes, children } = props;
  //console.log(children);
  return (
      <React.Fragment>
    <Paper className={classes.root}>
    
      <div className={classes.section1} align="left">
        
      {children}
        
       
      </div>
      
    </Paper>
    </React.Fragment>
  );
}

Single.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Single);