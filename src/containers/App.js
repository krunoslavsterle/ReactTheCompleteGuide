import React, { Component, Fragment } from "react";
import classes from "./App.css";

import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: "1", name: "Krunoslav", age: 29 },
      { id: "2", name: "Philipa", age: 32 },
      { id: "3", name: "Stephen", age: 12 }
    ],
    showPersons: false
  };

  // This is lifecycle method (Update, static) that gets called after the constructor! User very rearly.
  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  // This is lifecycle method (Create) that gets called after the 'render' method. It is most important method, use it for http request and similar.
  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  // Old lifecycle method (Create), rearly used.
  // componentWillMount() {
  //     console.log('[App.js] componentWillMount');
  // }

  switchNameHandler = newName => {
    // this.state.persons[0].name = "Kruno"; DONT DO THIS!, CAN'T MUTATE STATE DIRECTLY.

    this.setState({
      persons: [
        { name: newName, age: 29 },
        { name: "Philipa", age: 32 },
        { name: "Stephen", age: 12 }
      ]
    });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Create copy of the existing person object.
    const person = {
      ...this.state.persons[personIndex] // This will create copy of the person object (reference type) so that we can change is.
    };

    // Modify the copyed Person object.
    person.name = event.target.value;

    // Create copy of the Persons array from the state.
    const persons = [...this.state.persons];

    // Set a modified Person object to the copied array.
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons]; // ES6 feature (spread).
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  // This is lifecycle method (Update) that gets called after the 'getDerivedStateFromProps'. It is use for rendering and code in it should be only for that.
  // NOTE: If this method contains other components, these components lifecycle methods will be called next, and then it will continue to execute lifecycle method in this component
  // NOTE: When this method is called it doesnt have to update the real DOM, it will update the virtual DOM and then compare it with the real DOM to se if there is something to update.
  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <Fragment>
        <AuthContext.Provider
          value={{
            authenticated: true,
            login: this.loginHandler
          }}
        >
          <Cockpit
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

export default withClass(App, classes.App);
