import React from "react";
import { TableCell, TableHead, TableRow, styled } from "@mui/material";

import { COLORS } from "../../../utils/constant";

const StyledTableCell = styled(TableCell)({
  backgroundColor: COLORS.PRIMARY_COLOR,
  color: "#fff"
  // maxWidth: 110,
});

type IHeader = {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
};
const headers: IHeader[] = [
  { id: "name", label: "Nom" },
  { id: "cost", label: "Coût de l'étape" }
];

const ReusableStepsTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header: IHeader, index: number) => (
          <StyledTableCell
            key={header.id + index}
            align={header.align || "left"}
          >
            {header.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ReusableStepsTableHead;
