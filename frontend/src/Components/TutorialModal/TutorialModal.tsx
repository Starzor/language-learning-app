import Modal from "react-modal";
import { SetStateAction, useEffect, useRef, useState } from "react";

import "../../styles/TutorialModal.scss";
import { IMAGE_NAMES, IMAGE_NOTES } from "../../constants";
import Paragraph from "../Reusable/Paragraph";

interface TutorialModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, setIsOpen }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  const previousPage = () => {
    if (activeIndexRef.current <= 0) {
      console.log("left");
      return;
    }
    setActiveIndex(activeIndexRef.current - 1);
  };

  const nextPage = () => {
    if (activeIndexRef.current >= IMAGE_NOTES.length - 1) {
      console.log("right");
      return;
    }
    setActiveIndex(activeIndexRef.current + 1);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        previousPage();
        break;
      case "ArrowRight":
        nextPage();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <Modal
      isOpen={isOpen}
      className="tutorialModal"
      ariaHideApp={false}
      overlayClassName="tutorialModalOverlay"
    >
      <div className="xButtonContainer">
        <button onClick={() => setIsOpen(false)}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="textContainer">
        <Paragraph center>{IMAGE_NOTES[activeIndex]}</Paragraph>
      </div>
      <div className="imageContainer">
        <img
          src={require(`../../images/tutorial_images/${IMAGE_NAMES.find(
            (imageName, index) => index == activeIndex
          )}`)}
        />
      </div>

      <div className="buttonContainer">
        <button onClick={previousPage} disabled={activeIndex == 0}>
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={nextPage}
          disabled={activeIndex == IMAGE_NAMES.length - 1}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </Modal>
  );
};

export default TutorialModal;
