import React from "react";

import {
  StyledStepBodyCell,
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import { COLORS, PRODUCTION_STEPS_COL_WIDTHS } from "../../../utils/constant";
import { roundNumber } from "../../../utils/utils";
import { Box, Stack } from "@mui/material";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

type Props = {
  stepComponent: Record<string, any>;
  index: number;
};
const PriorStepComponentPreview = ({ stepComponent, index }: Props) => {
  return (
    <>
      <StyledStepFirstBodyColumn
        className="flexRow center"
        leftStep={30}
        style={{ backgroundColor: "#fff" }}
      >
        <Stack spacing={1}>
          <Box sx={{ height: 30 }} className="flexRow center">
            <Stack direction="row" spacing={4}>
              <StyledStepText weight={0}>
                {(stepComponent.priorSteps &&
                  index + 1 + ". " + stepComponent.priorSteps.name) ||
                  "-"}
              </StyledStepText>
            </Stack>
          </Box>
        </Stack>
      </StyledStepFirstBodyColumn>
      <StyledStepBodyCell align="center" width={widths[1]}>
        <StyledStepText weight={0}>
          {roundNumber(stepComponent.priorSteps.grossWeight * 1000)}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[2]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[3]}>
        <StyledStepText weight={0}>
          {roundNumber(stepComponent.priorSteps.realCost, 3)} €
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[4]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[5]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[6]}>
        <StyledStepText weight={0}>
          {roundNumber(stepComponent.priorSteps.netWeight, 2)}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[7]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[8]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[9]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[10]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[11]}>
        <StyledStepText weight={0}>{"-"}</StyledStepText>
      </StyledStepBodyCell>
    </>
  );
};

export default PriorStepComponentPreview;
