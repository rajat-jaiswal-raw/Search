/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      inputStr: ''
    };
    this.searchStr = this.searchStr.bind(this);
    this.insertObject = this.insertObject.bind(this);
    this.handelChange = this.handelChange.bind(this);
  }

  /**
   * It updates the value of Input element and searches for the value.
   * @param {Event} evt - A react event.
   */
  handelChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    this.searchStr(evt.target.value);
  }

  /**
   * It will search given string in dataList.
   * @param {String} str - Search string.
   */
  searchStr(str) {
    const indexList = [];
    const addedIndex = new Set();
    const { searchKey } = this.props;
    searchKey.forEach(key => {
      this.insertObject(indexList, addedIndex, key, str);
    });
    this.setState({ result: indexList });
  }

  /**
   * It will append the index of objects which have str in the value of key
   * @param {Array} indexList - List of index of objects which are already selected.
   * @param {Set} addedIndex - Set of index of selected objects.
   * @param {String} key - The property of object where we have to search.
   * @param {String} str - The string which we have to search.
   */
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
    const { result, inputStr } = this.state;
    const { dataList, placeholder, searchIcon, alignSearchIcon } = this.props;
    const data = result.map(element => {
      return <p>{JSON.stringify(dataList[element])}</p>;
    });
    return (
      <div>
        {alignSearchIcon === 'left' && searchIcon && <button type="button">Find</button>}
        <input
          name="inputStr"
          value={inputStr}
          onChange={this.handelChange}
          placeholder={placeholder}
        />
        {alignSearchIcon === 'right' && searchIcon && <button type="button">Find</button>}
        {data}
      </div>
    );
  }
}

Search.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  searchKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  searchIcon: PropTypes.bool,
  alignSearchIcon: PropTypes.string
};

Search.defaultProps = {
  placeholder: 'Search Something',
  searchIcon: false,
  alignSearchIcon: 'left'
};

export default Search;
