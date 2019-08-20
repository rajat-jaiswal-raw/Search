/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent } from 'react';
import Search from './Search/Search';
import './App.css';

class App extends PureComponent {
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
      ]
    };
    this.getIndexes = this.getIndexes.bind(this);
  }

  getIndexes(indexList) {
    const { dataList } = this.state;
    indexList.forEach(element => {
      console.log(dataList[element]);
    });
  }

  render() {
    const { dataList } = this.state;
    return (
      <div className="App">
        <Search
          dataList={dataList}
          searchKey={['b', 'a']}
          // placeholder="Select objects"
          searchIcon
          alignSearchIcon="right"
          getIndexes={this.getIndexes}
        />
      </div>
    );
  }
}

export default App;
