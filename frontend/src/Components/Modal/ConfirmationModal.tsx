import Modal from "react-modal";

interface ModalProps {
  labelText: string;
  isOpen: boolean;
  onClickClose: any;
  onClickConfirm: any;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  labelText,
  isOpen,
  onClickClose,
  onClickConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      className="reactModal"
      overlayClassName="reactModalOverlay"
    >
      <p className="commonText centerText">{labelText}</p>
      <div>
        <button className="commonText" onClick={onClickClose}>
          Ne
        </button>
        <button className="commonText lightPurpleText" onClick={onClickConfirm}>
          Ano
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
