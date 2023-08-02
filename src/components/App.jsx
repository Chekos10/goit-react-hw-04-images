import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImg } from './services/getImg';

export const App = () => {
  const [searchImg, setSearchImg] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [onSelectImage, setOnSelectImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchPostData = async () => {
      if(!searchImg) return
      try {
        setIsLoading(true);
        const data = await getImg(searchImg, page);
        setImages(prevImages=>[...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, [searchImg, page]);

  const hendleSearch = query => {
    if(searchImg!==query){
      setSearchImg(query)
      setPage(1)
      setImages([])
      setTotalImages(0)
    }
  };

  const onMoreBtnClick = () => {
    setPage(prevPage=>prevPage+1)
  };

  const openModal = onSelectImage => {
    setModalOpen(true)
    setOnSelectImage(onSelectImage)
  };
  const closeModal = () => {
    setModalOpen(false)
    setOnSelectImage(null)
  };
  const showBtn = images.length + 1 < totalImages; 
    return (
      <>
        <Searchbar hendleSearch={hendleSearch} />
        <ImageGallery data={images} onItemClick={openModal} />
        {images.length > 0 && showBtn && <Button onMoreBtnClick={onMoreBtnClick} />}
        {isLoading && <Loader />}
        {modalOpen && (
          <Modal
            image={onSelectImage}
            onClose={closeModal}
          />
        )}
      </>
    );
  }


/* export class App extends Component {
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
} */
// async componentDidUpdate(prevProps, prevState) {
//   const { searchImg, page, images } = this.state;
//   if (
//     prevState.searchImg !== this.state.searchImg ||
//     prevState.page !== page
//   ) {
//     try {
//       if (images.length === 0 || page === 1) {
//         this.setState({ isLoading: true });
//       }
//       const data = await getImg(searchImg, page);
//       this.setState({
//         images: [...images, ...data.hits],
//         totalImages: data.totalHits,
//         isLoading: false,
//       });
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }
// }