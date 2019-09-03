/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent } from 'react';
import Dropdown from './Dropdown/Dropdown';
import './App.css';

/**
 * App component to render all the components.
 */
class App extends PureComponent {
  /**
   * constructor for App component.
   * @param {*} props React props.
   */
  constructor(props) {
    super(props);
    this.state = {
      dataList: [
        { a: 'abracadbra', b: '2' },
        { a: 'zzz', b: 'abracadbra' },
        { a: 'abracadbra', b: '2' },
        { a: 'zzz', b: 'abracadbra' },
        { a: 'abracadbra', b: '2' },
        { a: 'zzz', b: 'abracadbra' },
        { a: 'abracadbra', b: '2' },
        { a: 'zzz', b: 'abracadbra' },
        { a: 'abracadbra', b: '2' },
        { a: 'zzz', b: 'abracadbra' },
        { a: 'abracadbra', b: '2' },
        { a: 'zzz', b: 'abracadbra' }
      ],
      searchKey: ['a']
    };
  }

  /**
   * render method for App component.
   */
  render() {
    const { dataList, searchKey } = this.state;
    return (
      <div className="App">
        <div className="abc">
          <Dropdown dataList={dataList} searchKey={searchKey} displayKey="a" />
        </div>
        <br />
        <div className="abc">
          <Dropdown dataList={dataList} searchKey={searchKey} displayKey="b" />
        </div>
      </div>
    );
  }
}

export default App;
