import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./Person.css";
import withClass from "../../../hoc/withClass";

class Person extends Component {
  render() {
    console.log("[Person.js] rendering....");
    return (
      <Fragment>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Fragment>
    );
  }
}

// This will be checked on dev-time (dev tools)
Person.propTypes = {
  click: PropTypes.func,
  changed: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number
};

export default withClass(Person, classes.Person);
