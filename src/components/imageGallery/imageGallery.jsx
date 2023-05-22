import React from 'react';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';
import ImageItem from '../imageGalleryItem/imageGalleryItem';


const Images = ({ images, showModal }) => (
  <ul className={css.imageGallery}>
    {images.map(image => {
      return (
        <ImageItem
          key={image.id}
          id={image.id}
          webformatURL={image.webformatURL}
          showModal={showModal}
          tag={image.tags}
        />
      );
    })}
  </ul>
);

export default Images;


Images.propTypes = {
   images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  showModal: PropTypes.func.isRequired,
};