import React, { Component } from 'react';
import { ReactComponent as Icon } from '../../icons/findIcon.svg';
import PropTypes from 'prop-types';
import css from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleInputChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state);
  };


  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button className={css.searchForm_button} type="submit">
            <Icon />
          </button>

          <input
            className={css.searchForm_input}
            name="imageName"
            onChange={this.handleInputChange}
            value={this.state.imageName}
            type="text"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}