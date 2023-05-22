import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css';

const ImageItem = ({ webformatURL, tag, id, showModal }) => (
  <li className={css.imageGalleryItem}>
    <img
      className={css.imageGalleryItem_image}
      src={webformatURL}
      id={id}
      width="150px"
      alt={tag}
      onClick={showModal}
      loading="lazy"
    />
  </li>
);

export default ImageItem;


ImageItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired,
};