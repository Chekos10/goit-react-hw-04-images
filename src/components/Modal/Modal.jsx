import { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css'
export class Modal extends Component {
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    const {image} = this.props
    return (
      <div onClick={this.onOverlayClick} className={css.overlay} >
        <div onKeyDown={this.props.onKeyDown} className={css.modal}>
          <img className={css.image} src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}
