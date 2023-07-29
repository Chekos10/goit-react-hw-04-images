import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from '../ImageGallery/ImageGallery.module.css'
export const ImageGallery = ({data, onItemClick}) =>{
    return (
        <ul className={css.gallery}>
        <ImageGalleryItem data={data} onItemClick={onItemClick}/>
        </ul>
    )
}
ImageGallery.propTypes = {
    data: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
};