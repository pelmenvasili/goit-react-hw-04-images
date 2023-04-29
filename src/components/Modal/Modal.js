import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({onClose, selectedImage}) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
   window.addEventListener('keydown', handleKeyPress);
  return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  
  return  (
      <>
        <div className={css.overlay} onClick={handleClickOverlay}>
          <div className={css.modal}>
            <img
              src={selectedImage}
              alt={selectedImage}
              className={css.modalImage}
            />
          </div>
        </div>
      </>
    );
  }

Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;