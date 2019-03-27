import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography' 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';


const styles = theme => ({
   root: {
    flexGrow: 1,
    color:'lightgoldenrodyellow'
  },
  button: {
    margin: theme.spacing.unit,
    color:'lightgoldenrodyellow',
    border:'thin solid lightgoldenrodyellow'
  },
  container: {
    flexWrap: 'wrap',
    textAlign:'center',
    padding:theme.spacing.unit * 4
  },
  textField: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    width: 600,
    color:'lightgoldenrodyellow',
  },
  input:{
    color:'lightgoldenrodyellow'
},
underline:{
  color:'lightgoldenrodyellow'
},
cssLabel: {
  '&$cssFocused': {
    color: 'lightgoldenrodyellow',
  },
  '&:before': {
    color: 'lightgoldenrodyellow',
  },
},
cssFocused: {},
cssUnderline: {
  '&:after': {
    borderBottomColor: 'lightgoldenrodyellow',
  },
 
},
margin: {
  margin: theme.spacing.unit,
  textAlign: 'center',

},

});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {url: "",
    open: false,
    vertical: 'top',
    horizontal: 'center',};
  }

  openSnack = state => () => {
    console.log("Sss")
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ url: event.target.value });
  };



  fetchData= () => 
  {
   const data = { url:this.state.url}
    fetch("http://127.0.0.1:5000", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data)
      
    })
    .then((resp) => {
      this.openSnack({ vertical: 'bottom', horizontal: 'right' })

      return resp.json()
    }) 
    .then((data) => {

      this.openSnack({ vertical: 'bottom', horizontal: 'right' })
      console.log(data)
    })
    .catch((error) => {
      this.openSnack({ vertical: 'bottom', horizontal: 'right' })
      console.log(error, "catch the hoop")
    })
  }

  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    return (
<div  className="App-header">
<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.container}>
        <Typography component="h2" variant="h2" gutterBottom className={classes.paper} style={{color:'lightgoldenrodyellow'}}>Foobar
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
          onChange={this.handleChange('name')}
        />
      </FormControl>
      <br></br>
        <br></br>
        <Button variant="outlined" className={classes.button} onClick={this.openSnack({ vertical: 'top', horizontal: 'center' })}>
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
