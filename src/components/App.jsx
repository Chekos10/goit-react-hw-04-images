import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImg } from './services/getImg';
export class App extends Component {
  state = {
    searchImg: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    onSelectImage: null,
    modalOpen: false,
    totalImages:0,
  };

  hendleSearch = searchImg => {
    this.setState({ searchImg, page: 1, images: [], totalImages:0 });
  };
  onMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  openModal = onSelectImage => {
    this.setState({ modalOpen: true, onSelectImage });
  };
  closeModal = () => {
    this.setState({ modalOpen: false, onSelectImage: null });
  };
  async componentDidUpdate(prevProps, prevState) {
    const { searchImg, page, images } = this.state;
    if (
      prevState.searchImg !== this.state.searchImg ||
      prevState.page !== page
    ) {
      try {
        if (images.length === 0 || page === 1) {
          this.setState({ isLoading: true });
        }
        const data = await getImg(searchImg, page);
        this.setState({
          images: [...images, ...data.hits],
          totalImages: data.totalHits,
          isLoading: false,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    const { isLoading, images, onSelectImage, modalOpen, totalImages } = this.state;
    const showBtn = images.length + 1 < totalImages; 
    return (
      <>
        <Searchbar hendleSearch={this.hendleSearch} />
        <ImageGallery data={this.state.images} onItemClick={this.openModal} />
        {images.length > 0 && showBtn && <Button onMoreBtnClick={this.onMoreBtnClick} />}
        {isLoading && <Loader />}
        {modalOpen && (
          <Modal
            image={onSelectImage}
            onClose={this.closeModal}
            onKeyDown={this.handleKeyDown}
          />
        )}
      </>
    );
  }
}