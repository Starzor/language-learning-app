import { ReactNode } from "react";
import "../../styles/Reusable/Paragraph.scss";

interface ParagraphProps {
  margin?: "Top" | "Bottom" | "TopBottom" | "None";
  textSize?: "Normal" | "Helper";
  textColor?: "Main" | "Secondary" | "Error" | "Success";
  center?: boolean;
  children?: ReactNode;
  dangerouslySetInnerHTML?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  margin = "TopBottom",
  textSize = "Normal",
  textColor = "Main",
  center,
  children,
  dangerouslySetInnerHTML,
}) => {
  return dangerouslySetInnerHTML ? (
    <p
      className={`paragraph margin${margin} size${textSize} color${textColor} ${
        center ? "center" : ""
      }`}
      dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
    />
  ) : (
    <p
      className={`paragraph margin${margin} size${textSize} color${textColor} ${
        center ? "center" : ""
      }`}
    >
      {children}
    </p>
  );
};

export default Paragraph;
