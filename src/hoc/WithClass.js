import React from "react";

// Higher-Order component that sets the class(es) from the props.
const withClass = props => (
  <div className={props.classes}>{props.children}</div>
);

export default withClass;
