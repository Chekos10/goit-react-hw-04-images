import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css'

export const Modal =({onClose,onKeyDown,image})=>{

  useEffect(()=>{
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () =>{
      window.removeEventListener('keydown', handleKeyDown);
    }
  },[onClose])

  const  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <div onClick={onOverlayClick} className={css.overlay} >
      <div onKeyDown={onKeyDown} className={css.modal}>
        <img className={css.image} src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}
Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}
