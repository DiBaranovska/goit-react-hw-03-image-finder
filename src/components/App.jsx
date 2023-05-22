import { Component } from 'react';
import Searchbar from './searchbar/searchbar';
import Loader from './loader/loader';
import Images from '../components/imageGallery/imageGallery';
import Button from '../components/button/button';
import Modal from '../components/modal/modal';
import PropTypes from 'prop-types';


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '34925796-aa77653a24e3240cce9cedfc1'

export default class App extends Component {
  state = {
    nameImages: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    showModal: false,
    imgModal: null,
  };

  openModal = (event) => {
    const imageModal = this.state.images.find(image => image.id === Number(event.target.id))
    this.setState({ showModal: true, imgModal: imageModal});
  };

  closeModal = () => {
    this.setState({ showModal: false, imgModal: null });
  };

  formSubmit = data => {
    if (data.imageName !== this.state.nameImages) {
      this.setState({ page: 1, images: [] });
    }
    const normalizedImageName = data.imageName.toLowerCase();
    this.setState({ nameImages: normalizedImageName });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.nameImages !== this.state.nameImages ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        await fetch(
          `${BASE_URL}?key=${API_KEY}&orientation=horizontal&per_page=12&page=${this.state.page}&q=${this.state.nameImages}`
        )
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(
              new Error(`${this.state.nameImages} not found`)
            );
          })
          .then(image => {
            if (prevState.nameImages !== this.state.nameImages) {
              return (this.setState({ images: image.hits }))
            } else {
              return (this.setState({ images: [...prevState.images, ...image.hits] }))
            }
          });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 'center',
          alignItems: 'center',
          fontSize: '16px',
          paddingBottom: '#24px',
        }}
      >
        <Searchbar onSubmit={this.formSubmit} />
        {this.state.error && <h1>{this.state.error.message}</h1>}
        {this.state.loading && <Loader />}
        {this.state.images && (
          <Images images={this.state.images} showModal={this.openModal} />
        )}
        {this.state.images.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {this.state.showModal && <Modal onClose={this.closeModal}><img src={this.state.imgModal.largeImageURL} alt={this.state.imgModal.tag} /></Modal>}
      </div>
    );
  }
}
