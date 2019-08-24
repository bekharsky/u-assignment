import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core//Typography";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

const styles = theme => ({
  heading: {
    margin: `${theme.spacing(4)}px 0`
  }
});

export class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Typography
        variant="h1"
        align="center"
        classes={{ root: classes.heading }}
      >
        Unity test assignment
      </Typography>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
