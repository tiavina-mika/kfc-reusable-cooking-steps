import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { getCellAlignment } from "../../utils/utils";
import {
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_SPACINGS
  // PRODUCTION_STEPS_FIST_COL_PL
} from "../../utils/constant";
import { lastColStickyStyle } from "./StyledSectionComponents";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid #cccccc"
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
type StyledTableHeadCellProps = {
  isFirstColumn: boolean;
  isLastColumn: boolean;
  align: "left" | "center" | "right";
  addBackground?: boolean;
};

const StyledHeadCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "addBackground" &&
    prop !== "isFirstColumn" &&
    prop !== "isLatsColumn" &&
    prop !== "align"
})<StyledTableHeadCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    height: "100%",
    color: "#fff",
    paddingRight: 16,
    paddingLeft: 16
  };

  if (props.isFirstColumn) {
    defaultStyles = {
      ...defaultStyles,
      ...stickyStyle,
      zIndex: 1000,
      paddingLeft: PRODUCTION_STEPS_SPACINGS.SECTION_FIRST_COL_PL
    };
  }

  if (props.isLastColumn) {
    defaultStyles = {
      ...defaultStyles,
      ...lastColStickyStyle,
      zIndex: 1000
    };
  }

  if (props.addBackground) {
    defaultStyles.backgroundColor = "#2196f3";
  }

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

const StyledHeadRow = styled(Box)({
  backgroundColor: "#2196f3",
  height: 60
});

const isHeadersLastColumn = (headersLength: number, index: number): boolean =>
  headersLength - 1 === index;
type Props = {
  headers?: any[];
  hasAnyHoveredRow: boolean;
};
const ProductionStepsTableHead: FC<Props> = ({
  headers,
  hasAnyHoveredRow = false
}) => {
  return (
    <StyledHeadRow className="flexRow center">
      {headers.map((header, index) => (
        // first head column
        <StyledHeadCell
          key={header.label + index}
          isFirstColumn={index === 0}
          isLastColumn={isHeadersLastColumn(headers.length, index)}
          addBackground={
            hasAnyHoveredRow && isHeadersLastColumn(headers.length, index)
          }
          sx={{
            width: PRODUCTION_STEPS_COL_WIDTHS[index],
            pl: 16
          }}
          align="left"
          className="flexRow center"
        >
          <Typography
            sx={{
              textAlign: "left",
              // textAlign: index === 0 ? "left" : "center",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "22px"
            }}
          >
            {header.label}
          </Typography>
        </StyledHeadCell>
      ))}
    </StyledHeadRow>
  );
};

export default ProductionStepsTableHead;
