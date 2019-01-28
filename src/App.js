import React, { Component } from 'react';
import claess from './App.css';
import Person from './Person/Person';

/**
 * 'state' element doesn't can change, if it does it obligate to React to reload all DOM
 * 'this' does reference to App class
 *  changing 'state' and 'props' are the only way to do that React reload DOM
 */

class App extends Component {
  state = {
    persons: [
      { id:'1', name: 'Max', age: 21},
      { id:'2', name: 'Manu', age: 22},
      { id:'3', name: 'Carol', age: 23}
    ],
    showPersons: true
  }

  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian'
    this.setState({persons: [
      { name: newName, age: 21},
      { name: 'Manu', age: 22},
      { name: 'Carol', age: 23}
    ] })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  tooglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons })
  }

  // When React does changes in the screen, it executes render() method
  // and not just return() method.
  render() {
    const styleBtn = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid white',
      padding: '8px',
      cursor: 'pointer',
      color: 'white',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }
    let persons = null;
    let clases = [];

    if(this.state.persons.length <= 2){
      clases.push('red');
    }
    if(this.state.persons.length <= 1){
      clases.push('bold');
    }

    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              name={person.name} 
              age={person.age}
              key={person.id}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );

      styleBtn.backgroundColor = 'red';
    }

    return (
      <div className="App">
        <h2>Hi I'm a React App</h2>
        <p className={clases.join(' ')}>This is really working!</p>
        <button 
        style={styleBtn}
        // onClick={this.switchNameHandler.bind(this, 'Marcus')}
        onClick={this.tooglePersonsHandler}
        >Switch Name</button>
        {persons}
      </div>
    );
  }
}

export default App;
