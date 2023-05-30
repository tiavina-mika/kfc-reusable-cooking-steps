import React, { FC, useCallback, useState } from "react";

import styled from "@emotion/styled";
import { Box, Button, Stack, TextField } from "@mui/material";
import { ErrorMessage, FormikErrors } from "formik";

import { getCellAlignment, roundNumber } from "../../utils/utils";
import { COLORS, PRODUCTION_STEPS_COL_WIDTHS } from "../../utils/constant";
import {
  computeProductionStepsRecipeOnFieldChange,
  computeSectionData,
  getDefaultSection,
  parseSectionToObject
} from "../../../utils/recipeUtils";
import {
  StyledErrorMessage,
  StyledSectionFirstBodyColumn
} from "../../StyledSectionComponents";

const widths = PRODUCTION_STEPS_COL_WIDTHS;
export const COMPONENT_NAME = "SECTIONS";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const cellsStyle = {
  paddingRight: 16,
  paddingLeft: 16
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// -------------- Table -------------- //
// body cell
type StyledBodyCellProps = {
  align: "left" | "center" | "right";
  width: number;
};
const StyledBodyCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "align" && prop !== "width"
})<StyledBodyCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    display: "flex",
    alignItems: "center",
    width: props.width,
    alignSelf: "stretch",
    margin: 0,
    ...cellsStyle
  };

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

type StyledTextProps = {
  disabled?: boolean;
};
const StyledText = styled(Box, {
  shouldForwardProp: (prop) => prop !== "disabled"
})<StyledTextProps>(({ disabled = true }) => {
  let defaultStyles: Record<string, any> = {
    fontWeight: 600,
    fontSize: 14
  };

  if (disabled) {
    defaultStyles.color = COLORS.PRODUCTION_STEPS_DISABLE_TEXT;
  } else {
    defaultStyles.color = COLORS.PRODUCTION_STEPS_TEXT_GREY;
  }

  return defaultStyles;
});

// const StyledAutocomplete = styled(Autocomplete)({
//   "& .MuiAutocomplete-inputRoot": {
//     width: 512,
//     height: 30,
//     background: "#fff",
//     borderRadius: 4
//   }
// });

const StyledTextField = styled(TextField)({
  width: 512,
  height: 30,
  background: "#fff",
  borderRadius: 4,
  "& .MuiInputBase-root": {
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
  "& .MuiInput-input": {
    fontWeight: 600,
    fontSize: 14,
    color: "#414141"
  }
});

type Props = {
  sections: Record<string, any>[];
  section: Record<string, any>;
  index: number;
  isHover: boolean;
  isDeleteHover: boolean;
  genericSections?: Record<string, any>[];
  onClearFocus: () => void;
  onFieldFocus: () => void;
  onFieldBlur: () => void;
  onKeyUp: (event: any, setFieldTouched: any) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<any>> | Promise<void>;
  hasError: (index: number) => boolean;
  onDeleteBlur: () => void;
  formValues: Record<string, any>;
};

const EditableSection: FC<Props> = ({
  sections,
  section,
  index,
  // for style
  isHover,
  isDeleteHover,
  genericSections,
  setFieldValue,
  onClearFocus,
  onFieldFocus,
  onFieldBlur,
  onKeyUp,
  hasError,
  onDeleteBlur,
  formValues
}) => {
  const [changed, setChanged] = useState<number>(0);

  const _stopPropagation = (event) => event && event.stopPropagation();

  const _onGenericSectionChange = (event, formValue, sectionIndex, reason) => {
    if (!event) return;

    let value = formValue;
    if (reason === "selectOption") {
      if (value.get) {
        value = value.get("name");
      } else {
        value = value.name;
      }
    }

    const section = genericSections.find(
      (section) => (section.get ? section.get("name") : section.name) === value
    );

    const newSections = [...sections];

    newSections[sectionIndex].name = value;

    if (reason === "selectOption" && section) {
      const newSection =
        parseSectionToObject([section])[0] || getDefaultSection();
      newSections[sectionIndex] = newSection;

      newSections[sectionIndex].error = false;
      newSections[sectionIndex].id = null;
      newSections[sectionIndex].parentId = section.id;
      newSections[sectionIndex].parentPercent = 100;

      formValues.sections = newSections;

      newSections[sectionIndex].productionSteps.forEach((step, stepIndex) => {
        step.stepComponents.forEach((ingredient, ingredientIndex) => {
          computeProductionStepsRecipeOnFieldChange(
            formValues,
            sectionIndex,
            stepIndex,
            ingredientIndex
          );
        });
      });
    }

    if (reason === "input-change" && section) {
      setFieldValue("sections", newSections);
    }

    if (section && !newSections[sectionIndex].parentId) {
      newSections[sectionIndex].parentId = null;
      newSections[sectionIndex].parentPercent = 0;
    }

    if (reason === "selectOption" && section) {
      setChanged(changed + 1);
      onClearFocus();
    }

    if (event.target) {
      _stopPropagation(event);
    }
  };

  const _addSection = (index, event = null) => {
    const newSections = [...sections];
    newSections.splice(index + 1, 0, getDefaultSection());

    // update section with computed production steps and step components data
    const newSection = newSections[newSections.length - 1];
    if (newSection) {
      computeSectionData(newSection, "productionSteps");
    }

    onDeleteBlur();
    setFieldValue("sections", newSections);
    _stopPropagation(event);
  };

  return (
    <Box
      sx={{
        display: "flex"
      }}
      onClick={_stopPropagation}
      // className={`${isHover ? classes.editHover : ""} ${error || isDeleteHover ? classes.sectionLineError : ""} ${(section.parentId)?classes.sectionInherited:""}`}
    >
      <StyledSectionFirstBodyColumn className="flexRow center">
        {isHover ? (
          <>
            {/* add button */}
            <Button
              onClick={(e) => _addSection(index, e)}
              className="flexCenter"
              sx={{ position: "absolute", left: -8 }}
            >
              {/* need to use directly the svg element because of an error in codesandbox importation */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8H8V13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13V8H1C0.45 8 0 7.55 0 7C0 6.45 0.45 6 1 6H6V1C6 0.45 6.45 0 7 0C7.55 0 8 0.45 8 1V6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z"
                  fill="#2196F3"
                />
              </svg>
            </Button>
            {/* input */}
            <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
              <StyledTextField
                name={`sections[${index}].name`}
                value={
                  typeof section.name === "string"
                    ? section.name
                    : section.name.get("name")
                }
                onClick={_stopPropagation}
                onFocus={onFieldFocus}
                onBlur={onFieldBlur}
                onKeyUp={onKeyUp as any}
                variant="standard"
                fullWidth
                onChange={(event) => {
                  _onGenericSectionChange(
                    event,
                    event.target.value,
                    index,
                    "input-change"
                  );
                }}
              />
              <ErrorMessage
                name={`sections[${index}].name`}
                render={(message) => (
                  <StyledErrorMessage>{message}</StyledErrorMessage>
                )}
              />
            </Stack>
          </>
        ) : hasError(index) ? (
          <ErrorMessage
            name={`sections[${index}].name`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledText disabled={false}>{section.name}</StyledText>
        )}
      </StyledSectionFirstBodyColumn>
      <StyledBodyCell align="left" width={widths[1]}>
        <StyledText>{section.inputWeight || "-"}</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[2]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[3]}>
        <StyledText>
          {section.cost ? `${roundNumber(section.cost, 3)} €` : "_"}
        </StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[4]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[5]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[6]}>
        <StyledText>{section.outputWeight || "-"}</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[7]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[8]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[9]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[10]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[11]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
    </Box>
  );
};

export default EditableSection;
