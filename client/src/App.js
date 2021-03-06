import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import {
  withStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./utils/snackbar";
import Chip from '@material-ui/core/Chip';
import Assignment from '@material-ui/icons/Assignment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';


const slug="http://127.0.0.1:5000"

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: "lightgoldenrodyellow"
  },
  chip: {
    margin: theme.spacing.unit,
    color: 'black',
    padding: 14,
    fontWeight: 'bold',
    backgroundColor: 'lightgrey'
  },
  button: {
    margin: theme.spacing.unit,
    color: "lightgoldenrodyellow",
    border: "thin solid lightgoldenrodyellow"
  },
  container: {
    flexWrap: "wrap",
    textAlign: "center",
    padding: theme.spacing.unit * 4
  },
  textField: {
    // padding: theme.spacing.unit * 2,
    textAlign: "center",
    width: 600,
    color: "lightgoldenrodyellow"
  },
  input: {
    color: "lightgoldenrodyellow"
  },
  underline: {
    color: "lightgoldenrodyellow"
  },
  cssLabel: {
    "&$cssFocused": {
      color: "lightgoldenrodyellow"
    },
    "&:before": {
      color: "lightgoldenrodyellow"
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "lightgoldenrodyellow"
    }
  },
  margin: {
    margin: theme.spacing.unit,
    textAlign: "center"
  }
});




class App extends Component {

  constructor(props) {
    super(props);
    this.state = { url: "", open: false, message: "", variant: "success", chip: false, slug: '', loading: false, disabled: false };
    this.keyPress = this.keyPress.bind(this);
  }

  chipClick = () => {
    this.setState({ copied: true })
    this.openSnack({ message: "Copied", variant: "success" });
  }

  // For calling the API on enter key click
  keyPress(e) {
    if (e.keyCode === 13) {
      this.setState({ url: e.target.value });
      this.fetchData()
    }
  }

  // Opening the snack bar
  openSnack(state) {
    this.setState({ open: true, ...state });
  }

  handleClose = () => {
    this.setState({ open: false });
  };


  // Input
  handleChange = name => event => {
    this.setState({ url: event.target.value });
  };
  

  validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  // API call
  fetchData = () => {
    if(!this.validURL(this.state.url))
    {
      this.openSnack({ message: "Not a proper url", variant: "error" });
      return false;

    }
    this.setState({ loading: true, disabled: true })
    const data = { url: this.state.url };
    fetch(slug, {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (data.success === false) {
          this.openSnack({ message: data.message, variant: "error" });
        } else {
          this.setState({ slug: slug+"/"+data.url, chip: true, loading: false, disabled: false })
        }
        console.log(data);
      })
      .catch(error => {
        this.openSnack({
          message: "Something went wrong. Please try again later",
          variant: "error"
        });
        this.setState({ loading: false, disabled: false })
        console.log(error, "catch the hoop");
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App-header">
        <div className='sweet-loading'>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={1000}
          onClose={this.handleClose}
        >
          <MySnackbarContent
            onClose={this.handleClose}
            variant={this.state.variant}
            message={this.state.message}
          />
        </Snackbar>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.container}>
              <Typography
                component="h2"
                variant="h2"
                gutterBottom
                className={classes.paper}
                style={{ color: "lightgoldenrodyellow" }}
              >
                Foobar
              </Typography>
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <Grid item xs={12} className={classes.container}>
              <br />
              <br />
              <FormControl className={classes.margin}>
                <InputLabel
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  URL to Foobar
                </InputLabel>
                <Input
                  id="custom-css-standard-input"
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  className={classes.textField}
                  onChange={this.handleChange("name")}
                  onKeyDown={this.keyPress}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.container}>
              {this.state.chip ?
                <CopyToClipboard text={this.state.slug}
                  onCopy={() => this.setState({ copied: true })}>
                  <Chip
                    icon={<Assignment />}
                    label={this.state.slug}
                    onClick={this.chipClick}
                    className={classes.chip}
                    color="black"
                  />
                </CopyToClipboard>
                : null}
            </Grid>
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={60}
              color={'#123abc'}
              loading={this.state.loading}
            />
            <Grid item xs={12} className={classes.container}>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={this.fetchData}
                disabled={this.state.disabled}
              >
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
