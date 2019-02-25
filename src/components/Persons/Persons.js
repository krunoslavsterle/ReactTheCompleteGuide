import React, { Component } from 'react';
import Person from './Person/Person';

// React lifecycle diagram: http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
class Persons extends Component {
    
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // Legacy lifecycle method, don't use.
    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps', props);
    // }



    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        
        // This is optimization, if persons has not changed this component doesn't need to re-render.
        if (nextProps.persons !== this.props.persons) {
            return true;
        } else {
            return false;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot!'};
    }

    // Legacy lifecycle method, don't use.
    // componentWillUpdate() {
    //     console.log('[Persons.js] componentWillUpdate');
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] render');
        return this.props.persons.map((person, index) => {
            return <Person 
                name={person.name} 
                age={person.age}
                click={() => this.props.clicked(index)}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
            />
        });
    }
    
}

export default Persons;