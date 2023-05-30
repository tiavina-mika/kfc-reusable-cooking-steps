import React, { FC } from "react";

import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import { roundNumber } from "../../utils/utils";
import { COLORS, PRODUCTION_STEPS_COL_WIDTHS } from "../../utils/constant";
import {
  StyledSectionFirstBodyColumn,
  StyledStepBodyCell
} from "../StyledSectionComponents";

const widths = PRODUCTION_STEPS_COL_WIDTHS;
export const COMPONENT_NAME = "SECTIONS";

const StyledText = styled(Typography)({
  fontWeight: 600,
  fontSize: 14,
  color: COLORS.PRODUCTION_STEPS_TEXT_GREY
});

type Props = {
  section: Record<string, any>;
};

const SectionPreview: FC<Props> = ({ section }) => {
  return (
    <>
      <StyledSectionFirstBodyColumn className="flexRow center">
        <StyledText>{section.name || "-"}</StyledText>
      </StyledSectionFirstBodyColumn>
      <StyledStepBodyCell align="left" width={widths[1]}>
        <StyledText>{section.inputWeight || "-"}</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[2]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[3]}>
        <StyledText>
          {section.cost ? `${roundNumber(section.cost, 3)} €` : "_"}
        </StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[4]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[5]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[6]}>
        <StyledText>{section.outputWeight || "-"}</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[7]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[8]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[9]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[10]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[11]}>
        <StyledText>-</StyledText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[12]} />
    </>
  );
};

export default SectionPreview;
