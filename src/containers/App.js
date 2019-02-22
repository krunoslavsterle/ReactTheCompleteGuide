import React, { Component } from 'react';
import classes from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    state = {
        persons: [
            { id: '1', name: 'Krunoslav', age: 29 },
            { id: '2', name: 'Philipa', age: 32 },
            { id: '3', name: 'Stephen', age: 12 }
        ],
        showPersons: false
    }

    switchNameHandler = (newName) => {
        // this.state.persons[0].name = "Kruno"; DONT DO THIS!, CAN'T MUTATE STATE DIRECTLY.

        this.setState({
            persons: [
                { name: newName, age: 29 },
                { name: 'Philipa', age: 32 },
                { name: 'Stephen', age: 12 }
            ]
         });
    }

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

        this.setState({persons: persons});
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons]; // ES6 feature (spread).
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    render() {
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
            <div className={classes.App}>         
                <Cockpit 
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler}
                />
                {persons}
            </div>
        );
    }
}

export default App;