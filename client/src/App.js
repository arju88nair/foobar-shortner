import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography' 
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
   root: {
    flexGrow: 1,
    color:'white'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    flexWrap: 'wrap',
    textAlign:'center'
  },
  textField: {
    marginLeft: theme.spacing.unit ,
    marginRight: theme.spacing.unit,
    width: 600,
    color:'white'
  },
  
});

class App extends Component {
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  render() {
    const { classes } = this.props;

    return (
<div  className="App-header">
      <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
        <Typography component="h2" variant="h2" gutterBottom className={classes.paper}>Foobar
        </Typography>
        </Grid>
        <br></br>
        <br></br>
        <Grid item xs={12}>
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="URL"
          className={classes.textField}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <br></br>
        <br></br>
        <Button variant="outlined" className={classes.button}>
        Make it short
      </Button>
        </form>
        </Grid>       
        </Grid>
        </div>
</div>
      );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
