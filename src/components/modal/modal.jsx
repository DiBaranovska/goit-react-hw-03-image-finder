import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown',this.handleKeyDown)
  }


  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }


  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  }

  handleBackDropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  }


  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          {this.props.children}
        </div>
      </div>, modalRoot);
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}