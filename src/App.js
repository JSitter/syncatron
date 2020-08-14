import React, { Component } from 'react';
import './App.css';
import './SavedHosts.js';
import SavedHosts from './SavedHosts.js';

const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
      <div className="App">
        < SavedHosts />
      </div>
    );
  }
}

export default App;
