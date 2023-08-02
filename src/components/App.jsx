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