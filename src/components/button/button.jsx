import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ onLoadMore }) => (
  <button className={css.button} onClick={onLoadMore}>
    Load more
  </button>
);

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};