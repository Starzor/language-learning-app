import "../../styles/Reusable/CheckboxButton.scss";

interface CheckboxButtonProps {
  active: boolean;
  onClick: () => any;
}

const CheckboxButton: React.FC<CheckboxButtonProps> = ({ active, onClick }) => {
  return (
    <button
      className={`checkboxButton ${active && "active"}`}
      onClick={onClick}
    ></button>
  );
};

export default CheckboxButton;