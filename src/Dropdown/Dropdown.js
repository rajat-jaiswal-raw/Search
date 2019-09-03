import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Search from '../Search/Search';
import './Dropdown.css';
import 'font-awesome/css/font-awesome.min.css';

/**
 * A react component which will take dataList and searchKey
 * and it will search the query in dataList.
 */
class Dropdown extends Component {
  /**
   * Constructor for Search component.
   * @param {*} props - React props.
   */
  constructor(props) {
    super(props);
    const { dataList } = this.props;
    this.state = {
      selected     : '',
      allOptionList: [...Array(dataList.length).keys()],
      optionList   : [],
      showOptions  : false
    };
    this.renderOptionList = this.renderOptionList.bind(this);
    this.renderOptionElement = this.renderOptionElement.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.toggleShowOptions = this.toggleShowOptions.bind(this);
    this.getIndexes = this.getIndexes.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  /**
   * It will add event listener outside the component.
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * It will remove event listener outside the component.
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * It will update the selected value as well as removes all the options.
   * @param {Event} evt - A react event.
   */
  setSelected(evt) {
    const { textContent } = evt.target;
    this.setState({ selected: textContent, showOptions: false });
  }

  /**
   * Updates the optionList state.
   * @param {Array} searchResult - List of indexes from search component.
   */
  getIndexes(searchResult) {
    this.setState({ optionList: searchResult });
  }

  /**
   * When clicked outside the component it will collapse
   * @param {Event} event - A react event.
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showOptions: false });
    }
  }

  /**
   * Changes showOptions state.
   * If new value of showOptions is true then all the indexes are pushed into optionList.
   */
  toggleShowOptions() {
    const { showOptions, allOptionList } = this.state;
    if (showOptions) {
      this.setState({ showOptions: false });
    } else {
      this.setState({ showOptions: true, optionList: [...allOptionList] });
    }
  }

  /**
   * It will allow us to search the values in dataList.
   * @returns {JSX} - A Search component.
   */
  rendersearchElement() {
    const { dataList, searchKey } = this.props;
    return (
      <div className="Dropdown-search">
        <Search dataList={dataList} searchKey={searchKey} getIndexes={this.getIndexes} searchIcon />
      </div>
    );
  }

  /**
   * Returns Dropdown head element with either selected option or placeholder in it.
   * @returns {JSX} - Dropdown head element.
   */
  renderDropdownHead() {
    const { selected } = this.state;
    const { placeholder } = this.props;
    const headContent = selected.length ? selected : placeholder;
    return (
      <div
        className="Dropdown-head Dropdown-border-style"
        onClick={this.toggleShowOptions}
        role="presentation"
      >
        <div className="Dropdown-head-selected">{headContent}</div>
        <i className="fa fa-caret-down Dropdown-triangle-icon" aria-hidden="true" />
      </div>
    );
  }

  /**
   * Return all the available options.
   * @returns {JSX} - All the option elements.
   */
  renderOptionList() {
    const { optionList } = this.state;
    const { dataList, displayKey } = this.props;
    const allElements = [];
    optionList.forEach(element => {
      const textContent = dataList[element][displayKey];
      if (textContent) {
        allElements.push(this.renderOptionElement(textContent));
      }
    });
    return allElements;
  }

  /**
   * An option which is at index in dataList.
   * @param {number} index - Index of option in dataList.
   * @returns {JSX} - An option element.
   */
  renderOptionElement(option) {
    return (
      <div className="Dropdown-option" onClick={this.setSelected} role="presentation">
        {option}
      </div>
    );
  }

  /**
   * render method of Dropdown component.
   */
  render() {
    const { showOptions } = this.state;
    return (
      <div
        ref={node => {
          this.wrapperRef = node;
        }}
        className="Dropdown"
      >
        {this.renderDropdownHead()}
        {showOptions && (
          <div className="Dropdown-menu Dropdown-border-style">
            {this.rendersearchElement()}
            <div className="Dropdown-all-options">{this.renderOptionList()}</div>
          </div>
        )}
      </div>
    );
  }
}

Dropdown.propTypes = {
  /** Array of objects where we have to perform search.
   * */
  dataList   : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  /** Array of keys in which we have to search.
   * */
  searchKey  : PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Placeholder for dropdown element.
   * - Default - ```Select```
   * */
  placeholder: PropTypes.string,
  /**
   * The key whose value will be in optionList.
   */
  displayKey : PropTypes.string.isRequired
};

Dropdown.defaultProps = {
  placeholder: 'Select'
};

export default Dropdown;
