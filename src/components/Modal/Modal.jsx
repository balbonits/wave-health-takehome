import './Modal.css';

const Modal = ({ isOpen, toggleModal, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => toggleModal()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={() => toggleModal()}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;