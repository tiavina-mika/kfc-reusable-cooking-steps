import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledStickyLastBodyColumn,
  StyledStickyLastBodyColumnProps
} from "./StyledSectionComponents";
import { MouseEvent } from "react";

type Props = {
  isHover: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type: StyledStickyLastBodyColumnProps["type"];
};
const RemoveColumn = ({ isHover, onClick, type }: Props) => {
  return (
    <StyledStickyLastBodyColumn type={type} addBackground={isHover}>
      {isHover && (
        <IconButton onClick={onClick} className="flexCenter" disableRipple>
          <DeleteIcon />
        </IconButton>
      )}
    </StyledStickyLastBodyColumn>
  );
};

export default RemoveColumn;
