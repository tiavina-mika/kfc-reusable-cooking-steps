import React, { FC, ReactNode } from "react";

import { grey } from "@mui/material/colors";
import { Box, SxProps } from "@mui/material";
import { sum } from "lodash";

import { PRODUCTION_STEPS_COL_WIDTHS } from "../utils/constant";
import { Theme } from "@emotion/react";

const TABLE_WIDTH = sum(PRODUCTION_STEPS_COL_WIDTHS);

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};
const ProductionStepsTable: FC<Props> = ({ children, sx }) => {
  return (
    <Box sx={{ overflowX: "scroll", ...sx }}>
      <div
        style={{
          maxWidth: "100vw",
          maxHeight: "95vh",
          border: "1px solid " + grey[300]
        }}
      >
        <Box sx={{ minWidth: TABLE_WIDTH }} aria-label="recipe table">
          {children}
        </Box>
      </div>
    </Box>
  );
};

export default ProductionStepsTable;
