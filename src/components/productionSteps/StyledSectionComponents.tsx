import React from "react";

import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import {
  Autocomplete,
  Box,
  BoxProps,
  InputBase,
  Select,
  SelectProps,
  TextareaAutosize,
  TextField,
  Typography
} from "@mui/material";
import {
  COLORS,
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_SPACINGS
} from "../../utils/constant";
import { getCellAlignment } from "../../utils/utils";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

export const lastColStickyStyle = {
  position: "sticky",
  right: 0
};

export const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid #cccccc"
};

export const StyledErrorMessage = styled("div")({
  marginTop: 2,
  color: red[500]
});

export const StyledProductionStepTextField = styled(TextField)({
  height: 30,
  background: "#fff",
  borderRadius: 4,
  "& .MuiInputBase-root, .MuiAutocomplete-inputRoot.MuiInputBase-root": {
    height: "100%",
    "&:before, :after": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    },
    "& .MuiInputBase-input": {
      paddingLeft: 7
    }
  },
  "& .MuiInput-input, .MuiAutocomplete-input": {
    fontWeight: 600,
    fontSize: 14,
    color: "#414141"
  }
});

export const StyledProductionStepsTextarea = styled(TextareaAutosize)({
  height: 30,
  background: "#fff",
  borderRadius: 4,
  fontWeight: 400,
  fontSize: 14,
  color: "#414141",
  width: "100%",
  fontFamily: "Roboto, sans-serif",
  lineHeight: 1.3
});

export const StyledProductionStepInputBase = styled(InputBase)({
  "& .MuiInputBase-input": {
    background: "#fff",
    borderRadius: 4,
    paddingLeft: 7,
    fontWeight: 600,
    fontSize: 14,
    color: "#414141",
    lineHeight: "1em",
    display: "flex",
    alignItems: "center",
    "&:before, :after": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    }
  }
});

// --------------------------------------- //
// -------------- Sections --------------- //
// --------------------------------------- //
export const StyledSectionFirstBodyColumn = styled((props: BoxProps) => (
  <Box {...props} sx={{ ...stickyStyle }} />
))({
  paddingLeft: PRODUCTION_STEPS_SPACINGS.SECTION_FIRST_COL_PL,
  paddingRight: 8,
  backgroundColor: COLORS.PRODUCTION_STEPS_BLUE,
  width: widths[0]
});

type StyledStickyLastBodyColumnProps = {
  type?: "section" | "step" | "ingredients";
  addBackground?: boolean;
};
export const StyledStickyLastBodyColumn = styled(
  (props: BoxProps) => <Box {...props} sx={{ ...lastColStickyStyle }} />,
  {
    shouldForwardProp: (prop) => prop !== "type" && prop !== "addBackground"
  }
)<StyledStickyLastBodyColumnProps>(
  ({ type = "section", addBackground = false }) => {
    const defaultStyle: Record<string, any> = {
      width: widths[widths.length - 1],
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };

    if (addBackground) {
      if (type === "section") {
        defaultStyle.backgroundColor = COLORS.PRODUCTION_STEPS_BLUE;
      }
      if (type === "step") {
        defaultStyle.backgroundColor = COLORS.PRODUCTION_STEPS_GREY;
      }
    }

    return defaultStyle;
  }
);

// --------------------------------------- //
// ---------------- Steps ---------------- //
// --------------------------------------- //
type StyledStepFirstBodyColumnProps = {
  leftStep?: number;
  bgcolor?: string;
};
export const StyledStepFirstBodyColumn = styled(
  (props: BoxProps) => <Box {...props} sx={{ ...stickyStyle }} />,
  {
    shouldForwardProp: (prop) => prop !== "leftStep" && prop !== "bgcolor"
  }
)<StyledStepFirstBodyColumnProps>(
  ({ bgcolor = COLORS.PRODUCTION_STEPS_GREY, leftStep = 0 }) => ({
    paddingLeft: PRODUCTION_STEPS_SPACINGS.STEP_FIRST_COL_PL + leftStep,
    paddingRight: 8,
    backgroundColor: bgcolor,
    width: widths[0],
    paddingTop: 16,
    paddingBottom: 17,
    zIndex: 1000
  })
);

type StyledTextProps = {
  disabled?: boolean;
};
export const StyledStepText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "disabled"
})<StyledTextProps>(({ disabled = false }) => {
  let defaultStyles: Record<string, any> = {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.5
  };

  if (disabled) {
    defaultStyles.color = COLORS.PRODUCTION_STEPS_DISABLE_TEXT;
  } else {
    defaultStyles.color = COLORS.PRODUCTION_STEPS_TEXT_GREY;
  }

  return defaultStyles;
});

type StyledStepBodyCellProps = {
  align: "left" | "center" | "right";
  width: number;
  px?: number;
};
export const StyledStepBodyCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "align" && prop !== "width" && prop !== "px"
})<StyledStepBodyCellProps>(({ width, align, px = 16 }) => {
  let defaultStyles: Record<string, any> = {
    display: "flex",
    alignItems: "center",
    width,
    alignSelf: "stretch",
    margin: 0,
    paddingLeft: px,
    paddingRight: px
  };

  if (align) {
    defaultStyles.justifyContent = getCellAlignment(align);
  }

  return defaultStyles;
});

export const StyledStepDescriptionText = styled(StyledStepText)({
  fontWeight: 400
});

type StyledProductionStepsSelectProps = {
  width: number;
};
export const StyledProductionStepsSelect = styled(
  (props: SelectProps) => <Select {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "width"
  }
)<StyledProductionStepsSelectProps & SelectProps>((props) => ({
  width: props.width
}));

export const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-inputRoot": {
    width: 512,
    height: 30,
    background: "#fff",
    borderRadius: 4
  }
});

export const StyledAutocompleteTextField = styled(TextField)({
  "& .MuiAutocomplete-inputRoot.MuiInputBase-root": {
    "&:before": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    },
    "& .MuiAutocomplete-input": {
      padding: 4
    }
  },
  "& .MuiInput-input": {
    fontWeight: 600,
    fontSize: 14,
    color: "#414141"
  }
});
