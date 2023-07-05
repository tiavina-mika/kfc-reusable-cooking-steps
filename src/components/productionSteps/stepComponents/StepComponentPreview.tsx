import React from "react";
import { Box, Stack } from "@mui/material";

import {
  StyledStepBodyCell,
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../../utils/constant";
import { roundNumber } from "../../../utils/utils";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

type Props = {
  stepComponent: Record<string, any>;
  supplierItem: Record<string, any>;
  subComponent?: boolean;
};
const StepComponentPreview = ({
  stepComponent,
  supplierItem,
  subComponent = false
}: Props) => {
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
              <StyledStepText
                weight={0}
                fontSize={subComponent ? 12 : 14}
                disabled={subComponent}
              >
                {(supplierItem && supplierItem.name) || "-"}
              </StyledStepText>
            </Stack>
          </Box>
        </Stack>
      </StyledStepFirstBodyColumn>
      <StyledStepBodyCell align="center" width={widths[1]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {stepComponent.grossWeight
            ? roundNumber(stepComponent.grossWeight * 1000)
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[2]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {supplierItem && supplierItem.pricePerKg
            ? roundNumber(supplierItem.pricePerKg, 2) + " €"
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[3]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {stepComponent.realCost || stepComponent.realCost === 0
            ? `${roundNumber(stepComponent.realCost, 3)} €`
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[4]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {stepComponent.transformationMode &&
          stepComponent.transformationMode.name
            ? stepComponent.transformationMode.name
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[5]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {stepComponent.transformRate
            ? stepComponent.transformRate + " %"
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[6]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {stepComponent.netWeight
            ? roundNumber(stepComponent.netWeight, 2)
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[7]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[8]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[9]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[10]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[11]}>
        <StyledStepText
          weight={0}
          fontSize={subComponent ? 12 : 14}
          disabled={subComponent}
        >
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
    </>
  );
};

export default StepComponentPreview;
