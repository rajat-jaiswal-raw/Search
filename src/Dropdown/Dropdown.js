/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types';
import './Dropdown.css';
import 'font-awesome/css/font-awesome.min.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { currOption: 'Select one', options: ['a', 'b', 'c', 'd'], showOptions: false };
    this.selectOption = this.selectOption.bind(this);
    this.displayOptions = this.displayOptions.bind(this);
  }

  selectOption(evt) {
    const { textContent } = evt.target;
    this.setState({ currOption: textContent, showOptions: false });
  }

  displayOptions() {
    this.setState({ showOptions: true });
  }

  render() {
    const { currOption, options, showOptions } = this.state;

    const data = showOptions
      ? options.map((element, index) => {
          return (
            <div
              className="Search-result-object"
              key={index}
              onClick={this.selectOption}
              onKeyPress={this.selectOption}
              role="presentation"
            >
              {element}
            </div>
          );
        })
      : '';

    const DropdownClass = !showOptions ? 'Dropdown-collapse' : 'Dropdown-expand';

    return (
      <div className={`Dropdown ${DropdownClass}`}>
        <div
          className="Dropdown-current"
          onClick={this.displayOptions}
          onKeyPress={this.displayOptions}
          role="presentation"
        >
          {currOption}
          <i className="fa fa-caret-down Dropdown-triangle-icon" aria-hidden="true" />
        </div>
        <div>{data}</div>
      </div>
    );
  }
}

// Dropdown.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.string).isRequired
// };

// Dropdown.defaultProps = {};

export default Dropdown;

// constructor(props) {
//   super(props);
//   this.state = {
//     dataList: [
//       { a: 'abracadbra', b: '2' },
//       { a: 'zzz', b: 'abracadbra' },
//       { a: 'abracadbra', b: '2' },
//       { a: 'zzz', b: 'abracadbra' },
//       { a: 'abracadbra', b: '2' },
//       { a: 'zzz', b: 'abracadbra' },
//       { a: 'abracadbra', b: '2' },
//       { a: 'zzz', b: 'abracadbra' },
//       { a: 'abracadbra', b: '2' },
//       { a: 'zzz', b: 'abracadbra' },
//       { a: 'abracadbra', b: '2' },
//       { a: 'zzz', b: 'abracadbra' }
//     ]
//   };
//   this.getIndexes = this.getIndexes.bind(this);
// }

// getIndexes(indexList) {
//   const { dataList } = this.state;
//   indexList.forEach(element => {
//     console.log(dataList[element]);
//   });
// }

// render() {
//   const { dataList } = this.state;
//   return (
//     <div className="App">
//       <Search
//         dataList={dataList}
//         searchKey={['b', 'a']}
//         // placeholder="Select objects"
//         searchIcon
//         alignSearchIcon="right"
//         getIndexes={this.getIndexes}
//       />
//     </div>
//   );
// }
