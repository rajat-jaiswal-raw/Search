/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent } from 'react';
import Dropdown from './Dropdown/Dropdown';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Dropdown />
      </div>
    );
  }
}

export default App;
