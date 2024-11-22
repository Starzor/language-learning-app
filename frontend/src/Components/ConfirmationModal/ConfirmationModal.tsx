import Modal from "react-modal";
import Paragraph from "../Reusable/Paragraph";
import "../../styles/ConfirmationModal.scss";

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
      className="confirmationModal"
      overlayClassName="confirmationModalOverlay"
    >
      <Paragraph center>{labelText}</Paragraph>
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
