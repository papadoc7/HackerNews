import React from 'react';
import Story from './Story';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    minHeight: 230,
    maxHeight: 'auto',
    transitionDuration: '0.3s',
    backgroundColor: 'lightgray',
  },
});

function Layout(props) {
  const { classes, stories } = props;

  return (
    <div className={classes.root}>
      {getColumn(props)};
    </div>
  );
}

function getColumn(props) {
  const { classes, stories } = props;
  var indents = [];

  for(let i=0; i<stories.length; i=i+8) {
    indents.push(
      <Grid container spacing={24}>
        {columns(props, stories, i)}
      </Grid>
    )
  }
  return indents
}

function columns(props, stories, index) {
  const { classes } = props;
  var indents = [];

  //loop to create 2 sets of 4 columns
  for(let i=0; i<4; i++ ) {
    //let j=i+4; 2nd way insted of setting "fixed" value 7-i
    indents.push( 
      <Grid container spacing={24} item xs={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}> {<Story story={stories[index+i]} />} </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}> {<Story story={stories[index+7-i]} />} </Paper> {/* parameter of stories as 7-i to create the remaining 4 columns*/}
        </Grid>
      </Grid>
    )
  }
  return indents
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);