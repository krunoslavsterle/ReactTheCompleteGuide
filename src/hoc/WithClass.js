import React from "react";

// Higher-Order component that sets the class(es) from the props.
// Option 1:
// const withClass = props => (
//   <div className={props.classes}>{props.children}</div>
// );

// Option 2:
const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent />
    </div>
  );
};

export default withClass;
