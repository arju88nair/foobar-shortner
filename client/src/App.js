import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography' 
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import purple from '@material-ui/core/colors/purple';

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
    color:'white',
    borderBottom: '2px solid white',
  },
  input:{
    color:'white'
},
underline:{
  color:'white'
},
cssLabel: {
  '&$cssFocused': {
    color: 'white',
  },
},
cssFocused: {},
cssUnderline: {
  '&:after': {
    borderBottomColor: 'white',
  },
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
        <Typography component="h2" variant="h2" gutterBottom className={classes.paper} style={{color:'white'}}>Foobar
        </Typography>
        </Grid>
        <br></br>
        <br></br>
        <Grid item xs={12}>
        <FormControl className={classes.margin}>
        <InputLabel
          htmlFor="custom-css-standard-input"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Custom CSS
        </InputLabel>
        <Input
          id="custom-css-standard-input"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl></Grid>       
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
