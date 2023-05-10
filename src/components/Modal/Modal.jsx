import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { ModalBackgrop, ModalStyled } from './Modal.styled';

const Modal = ({ modalImage, tags, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleESC);

    return () => {
      window.removeEventListener('keydown', handleESC);
    };
  });

  const handleESC = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <ModalBackgrop onClick={handleBackdropClick}>
      <div className="modal">
        <ModalStyled src={modalImage} loading="lazy" alt={tags} />
      </div>
    </ModalBackgrop>
  );
};

export default Modal;

Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
