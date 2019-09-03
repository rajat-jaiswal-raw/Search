import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import './Search.css';
/**
 * A react component which will take dataList and searchKey
 * and it will search the query in dataList.
 */
class Search extends Component {
  /**
   * Constructor for Search component.
   * @param {*} props - React props.
   */
  constructor(props) {
    super(props);
    this.state = { inputStr: '' };
    this.searchStr = this.searchStr.bind(this);
    this.insertObject = this.insertObject.bind(this);
    this.handelChange = this.handelChange.bind(this);
  }

  /**
   * It will return font awsome search icon.
   * @returns {JSX} - A search icon.
   */
  static getIcon() {
    return <i className="fa fa-search Search-search-icon" />;
  }

  /**
   * Returns an input element.
   * @param {String} inputStr - value for input element
   * @param {String} placeholder - placeHolder for input element
   * @param {JSX} - An input element.
   */
  getInputElement(inputStr, placeholder) {
    return (
      <input
        className="Search-input-field"
        name="inputStr"
        value={inputStr}
        onChange={this.handelChange}
        placeholder={placeholder}
      />
    );
  }

  /**
   * It updates the value of Input element and searches for the value.
   * @param {Event} evt - A react event.
   */
  handelChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    this.searchStr(evt.target.value);
  }

  /**
   * It will search given string in dataList.
   * @param {String} str - Search string.
   */
  searchStr(str) {
    const lowerStr = str.toLocaleLowerCase();
    const indexList = [];
    const addedIndex = new Set();
    const { searchKey, getIndexes } = this.props;
    searchKey.forEach(key => {
      this.insertObject(indexList, addedIndex, key, lowerStr);
    });
    getIndexes(indexList);
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
      if (!addedIndex.has(index) && value[key] && value[key].toLowerCase().includes(str)) {
        indexList.push(index);
        addedIndex.add(index);
      }
    });
  }

  /**
   * render method of Search component.
   */
  render() {
    const { inputStr } = this.state;
    const { placeholder, searchIcon, alignSearchIcon } = this.props;
    return (
      <div className="Search">
        <div className="Search-input">
          {searchIcon && alignSearchIcon === 'left' && Search.getIcon()}
          {this.getInputElement(inputStr, placeholder)}
          {searchIcon && alignSearchIcon === 'right' && Search.getIcon()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  /** Array of objects where we have to perform search.
   * */
  dataList       : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  /**
   * A function which will get an array of index of dataList objects as a parameter.
   */
  getIndexes     : PropTypes.func.isRequired,
  /** Array of keys in which we have to search.
   * */
  searchKey      : PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Placeholder for input element.
   * - Default - ```Search Something```
   * */
  placeholder    : PropTypes.string,
  /** Display search icon or not.
   * - Options - ```true``` | ```false```
   * - Default - ```false```
   * */
  searchIcon     : PropTypes.bool,
  /** Alignment of search icon.
   * - Options - ```left``` | ```right```
   * - Default - ```left```
   * */
  alignSearchIcon: PropTypes.string
};

Search.defaultProps = {
  placeholder    : 'Search',
  searchIcon     : false,
  alignSearchIcon: 'left'
};

export default Search;
