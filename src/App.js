import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

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
        //const persons = this.state.persons.slice(); // Use slice to create a copy of the Array, otherwise we will be mutating the original state ES5.
        const persons = [...this.state.persons]; // ES6 feature (spread).
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    render() {
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div> 
                    {this.state.persons.map((person, index) => {
                        return <Person 
                            name={person.name} 
                            age={person.age}
                            click={() => this.deletePersonHandler(index)}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>
                    })}
                </div>
            );

            style.backgroundColor = 'red';
            style['hover'] = {
                backgroundColor: 'lightred',
                color: 'black'
            }
        }

        const classes = [];
        if (this.state.persons.length <= 2) {
            classes.push('red');
        }

        if (this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
            <StyleRoot>
                <div className="App">         
                    <h1>Hi, I'm a React App</h1>   
                    <p className={classes.join(' ')}>This is really working</p>
                        <button 
                            style={style}
                            onClick={() => this.togglePersonsHandler()}>Switch Name</button>
                        
                        {/* { this.state.showPersons ? // This is one way of handling conditions, not the best way
                            <div>
                                <Person 
                                    name={this.state.persons[0].name} 
                                    age={this.state.persons[0].age}>
                                </Person>

                                <Person 
                                    name={this.state.persons[1].name} 
                                    age={this.state.persons[1].age}
                                    click={this.switchNameHandler.bind(this, 'Kreso')}
                                    changed={this.nameChangedHandler}>My Hobbies: Cycling
                                </Person>
                                
                                <Person 
                                    name={this.state.persons[2].name} 
                                    age={this.state.persons[2].age}>
                                </Person>
                            </div> : null
                        } */}
                    {persons}
                </div>
            </StyleRoot>
          
            
        );

        //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, my name is Krunoslav'));
    }
}

export default Radium(App);