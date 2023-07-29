import PropTypes from 'prop-types';
import css from '../Button/Button.module.css'
export const Button = ({onMoreBtnClick}) => {
    return (
        <button className={css.LoadMoreBtn} onClick={onMoreBtnClick}>
        Load more
        </button>
    )
}
Button.propTypes = {
    onMoreBtnClick: PropTypes.func.isRequired,
};
