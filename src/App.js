/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent } from 'react';
import Search from './Search';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Search
          dataList={[{ a: 'abracadbra', b: '2' }, { a: 'zzz', b: 'abracadbra' }]}
          searchKey={['b', 'a']}
          placeholder="default value"
          searchIcon
          alignSearchIcon="left"
        />
      </div>
    );
  }
}

export default App;
