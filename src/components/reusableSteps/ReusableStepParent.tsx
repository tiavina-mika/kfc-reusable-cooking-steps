import React, { FC } from "react";

import { Box, Stack } from "@mui/material";
import { ErrorMessage } from "formik";

import {
  StyledErrorMessage,
  StyledStepBodyCell,
  StyledStepFirstBodyColumn,
  StyledStepText,
  StyledStickyLastBodyColumn
} from "../productionSteps/StyledSectionComponents";
import { COLORS, PRODUCTION_STEPS_COL_WIDTHS } from "../../utils/constant";
import { IHoveredRow } from "../productionSteps/sections/Sections";

const widths = PRODUCTION_STEPS_COL_WIDTHS;
export const COMPONENT_NAME = "STEP_PARENT";

type Props = {
  step: Record<string, any>;
  onRowHover: (component: string, index?: number) => void;
  onRowBlur: () => void;
  hoveredRow: IHoveredRow;
};

const ReusableStepParent: FC<Props> = ({
  step,
  onRowHover,
  onRowBlur,
  hoveredRow
}) => {
  const _isHover = () => hoveredRow && COMPONENT_NAME === hoveredRow.component;
  return (
    <Box
      onMouseEnter={() => onRowHover(COMPONENT_NAME)}
      onMouseLeave={onRowBlur}
      className="flexRow"
      sx={{
        bgcolor: COLORS.YELLOW_REUSABLE_STEP_PARENT,
        borderBottom: "1px solid #CCCCCC"
      }}
    >
      {/* ------------ name and description ------------ */}
      <StyledStepFirstBodyColumn
        className="flexColumn"
        bgcolor={COLORS.YELLOW_REUSABLE_STEP_PARENT}
      >
        {/* input */}
        <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
          <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
            <StyledStepText>{step?.name || "-"}</StyledStepText>
            <ErrorMessage
              name="name"
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        </Stack>
      </StyledStepFirstBodyColumn>
      <StyledStepBodyCell align="left" width={widths[1]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[2]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[3]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ transformation ------------ */}
      <StyledStepBodyCell align="left" width={widths[4]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[5]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[6]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ kitchenArea ------------ */}
      <StyledStepBodyCell align="left" width={widths[7]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ machineType ------------ */}
      <StyledStepBodyCell align="left" width={widths[8]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ machineSetting ------------ */}
      <StyledStepBodyCell align="left" width={widths[9]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ stepDuration ------------ */}
      <StyledStepBodyCell align="left" width={widths[10]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ stepDurationUnit ------------ */}
      <StyledStepBodyCell align="left" width={widths[11]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      {/* -------- delete icon -------- */}
      <StyledStickyLastBodyColumn type="step" addBackground={_isHover()} />
    </Box>
  );
};

export default ReusableStepParent;
