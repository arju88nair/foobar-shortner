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
    color: theme.palette.text.secondary,
  },
  container: {
    flexWrap: 'wrap',
    textAlign:'center'
  },
  textField: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    width: 600,
    color:'white',
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
  '&:before': {
    color: 'white',
  },
},
cssFocused: {},
cssUnderline: {
  '&:after': {
    borderBottomColor: 'white',
  },
 
},
margin: {
  margin: theme.spacing.unit,
  textAlign: 'center',

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
        <Grid item xs={12} className={classes.container}>
        <Typography component="h2" variant="h2" gutterBottom className={classes.paper} style={{color:'white'}}>Foobar
        </Typography>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid item xs={12} className={classes.container}>
        <br></br>
        <br></br>
        <FormControl className={classes.margin}>
        <InputLabel
          htmlFor="custom-css-standard-input"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
         URL to Foobar
        </InputLabel>
        <Input
          id="custom-css-standard-input"
          classes={{
            underline: classes.cssUnderline,
          }}
          className={classes.textField}
        />
      </FormControl>
      <br></br>
        <br></br>
        <Button variant="outlined" className={classes.button}>
        Foobar!
      </Button>
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
