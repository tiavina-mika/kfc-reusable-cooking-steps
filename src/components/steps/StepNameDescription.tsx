import React, { FC } from "react";

import { Box, Stack } from "@mui/material";

import {
  StyledStepDescriptionText,
  StyledStepText
} from "../StyledSectionComponents";

type Props = {
  name: string;
  description: string;
  index: number;
};

const StepNameDescription: FC<Props> = ({ name, description, index }) => {
  return (
    <Stack spacing={1}>
      <Box sx={{ height: 30 }} className="flexRow center">
        <Stack direction="row" spacing={1}>
          <StyledStepText>{index + 1}.</StyledStepText>
          <StyledStepText>{name || "-"}</StyledStepText>
        </Stack>
      </Box>
      <StyledStepDescriptionText>{description}</StyledStepDescriptionText>
    </Stack>
  );
};

export default StepNameDescription;
