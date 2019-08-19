/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

class Form extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handelChange = this.handelChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  /**
   *
   * @param {*} evt
   */
  handelChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    const { searchStr } = this.props;
    searchStr(evt.target.value);
  }

  /**
   *
   * @param {*} evt
   */
  handelSubmit(evt) {
    const { searchStr } = this.props;
    const { input } = this.state;
    evt.preventDefault();
    const str = input;
    this.setState({
      input: ''
    });
    searchStr(str);
  }

  render() {
    const { input } = this.state;
    const { placeholder, searchIcon } = this.props;
    return (
      <form onSubmit={this.handelSubmit}>
        <input
          id="input"
          name="input"
          value={input}
          onChange={this.handelChange}
          placeholder={placeholder}
        />
        {searchIcon && <button type="button">Find</button>}
      </form>
    );
  }
}

Form.propTypes = {
  searchStr: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired
};

Form.defaultProps = {};

export default Form;
