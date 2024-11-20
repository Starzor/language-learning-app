import { ReactNode } from "react";
import "../../styles/Reusable/Heading.scss";

interface HeadingProps {
  margin?: "Top" | "Bottom" | "TopBottom" | "None";
  textColor?: "Main" | "Secondary" | "Error" | "Success";
  center?: boolean;
  children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  margin = "TopBottom",
  textColor = "Main",
  center,
  children,
}) => {
  return (
    <h3
      className={`heading margin${margin} color${textColor} ${
        center ? "center" : ""
      }`}
    >
      {children}
    </h3>
  );
};

export default Heading;
