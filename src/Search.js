/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Form from './Form';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
    this.searchStr = this.searchStr.bind(this);
    this.insertObject = this.insertObject.bind(this);
  }

  searchStr(str) {
    const indexList = [];
    const addedIndex = new Set();
    const { searchKey } = this.props;
    searchKey.forEach(key => {
      this.insertObject(indexList, addedIndex, key, str);
    });
    this.setState({ result: indexList });
  }

  insertObject(indexList, addedIndex, key, str) {
    const { dataList } = this.props;
    dataList.forEach((value, index) => {
      if (!addedIndex.has(index) && value[key] && value[key].includes(str)) {
        indexList.push(index);
        addedIndex.add(index);
      }
    });
  }

  render() {
    const { result } = this.state;
    const { dataList, placeholder, searchIcon } = this.props;
    const data = result.map(element => {
      return <p>{JSON.stringify(dataList[element])}</p>;
    });
    return (
      <div>
        <Form searchStr={this.searchStr} placeholder={placeholder} searchIcon={searchIcon} />
        {data}
      </div>
    );
  }
}

Search.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  searchKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  searchIcon: PropTypes.bool
};

Search.defaultProps = {
  placeholder: 'Search Something',
  searchIcon: false
};

export default Search;
