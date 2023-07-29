import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css'
export const ImageGalleryItem = ({data , onItemClick})=> {
  return data.map(image=>{
    return (
      <li key={image.id} onClick={()=>onItemClick(image)}>
        <img className={css.image} src={image.previewURL} alt={image.tags}/>
      </li>
    )
  })
}
ImageGalleryItem.propTypes = {
  data: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};