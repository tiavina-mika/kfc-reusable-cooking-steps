import React, { FC } from "react";

import styled from "@emotion/styled";
import {
  Accordion,
  AccordionProps,
  Box
} from "@mui/material";

import { COLORS } from "../../../utils/constant";
import EditableSelectedReusableStep from "./EditableSelectedReusableStep";
import { IHoveredRow } from "../../productionSteps/sections/Sections";
import { StyledStepAccordionSummary } from "../../productionSteps/StyledSectionComponents";

export const COMPONENT_NAME = "STEPS";

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //

// -------------- Accordion -------------- //
const StyledAccordion = styled((props: AccordionProps) => (
  <Accordion {...props} />
))({
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
});

const StyledLeftBar = styled("div")({
  width: 8,
  backgroundColor: COLORS.DARK_YELLOW_REUSABLE_STEP_PARENT,
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  zIndex: 100000
});

type Props = {
  steps: Record<string, any>[];
  isEdition: boolean;
  onRowHover: (component: string, index?: number) => void;
  onRowBlur: () => void;
  hoveredRow: IHoveredRow;
  // genericSections?: Record<string, any>[];
  onClearFocus: () => void;
  onFieldFocus: () => void;
  onFieldBlur: any;
  onKeyUp: (event: any, setFieldTouched: any) => void;
  // onKeyDown: (event: any) => void;
  // onDeleteHover: (
  //   component: string,
  //   index: number,
  //   parendIndex?: number | null
  // ) => void;
  // deleteHover: Record<string, any>;
  errors: Record<string, any>;
  setFieldValue: any;
  // onDeleteBlur: () => void;
  machineTypes: Record<string, any>[];
  kitchenAreas: Record<string, any>[];
  allSteps: Record<string, any>[];
  formValues: Record<string, any>;
  setValues: any;
  // computeStepsFormValues: (steps: Record<string, any>, sectionIndex: number) => void;
};

const ReusableSteps: FC<Props> = ({
  steps,
  isEdition,
  onRowHover,
  onRowBlur,
  hoveredRow,
  // genericSections,
  onClearFocus,
  onFieldFocus,
  onFieldBlur,
  onKeyUp,
  // onKeyDown
  // onDeleteHover,
  // deleteHover,
  setFieldValue,
  errors,
  machineTypes,
  kitchenAreas,
  allSteps,
  formValues,
  setValues
  // computeStepsFormValues
  // onDeleteBlur
}) => {
  // do not display steps row in preview if it's empty
  // dsiplay an empty row if steps is empty in edition mode
  // alway has a default section, see: getDefaultSection()

  // if (!isEdition && !(steps.length && steps[0].id)) return;

  // const _isHover = (index: number): boolean => {
  //   return (
  //     hoveredRow &&
  //     COMPONENT_NAME === hoveredRow.component &&
  //     hoveredRow.index === index
  //   );
  // };
  const _isHover = (index) =>
    hoveredRow &&
    COMPONENT_NAME === hoveredRow.component &&
    hoveredRow.index === index;

  // const _isDeleteHover = (index: number): boolean => {
  //   return (
  //     deleteHover &&
  //     COMPONENT_NAME === deleteHover.component &&
  //     deleteHover.index === index
  //   );
  // };

  const _hasError = (index: number, field: string) => {
    return false;
    // return errors?.productionSteps[index]?.[field];
  };

  return (
    <Box className="flexColumn" sx={{ position: "relative" }}>
      <StyledLeftBar />
      {steps.map((step, index) => (
        <StyledAccordion
          elevation={0}
          defaultExpanded
          square
          disableGutters
          key={index}
        >
          <StyledStepAccordionSummary
            expandIcon={<img alt="chevron" src="/icons/chevron-down.svg" />}
            onMouseEnter={() => onRowHover(COMPONENT_NAME, index)}
            onMouseLeave={onRowBlur}
          >
            {isEdition ? (
              <EditableSelectedReusableStep
                steps={steps}
                step={step}
                formValues={formValues}
                index={index}
                isEdition={isEdition}
                // index={index}
                isHover={_isHover(index)}
                // isDeleteHover={_isDeleteHover(index)}
                // genericSections={genericSections}
                setFieldValue={setFieldValue}
                onClearFocus={onClearFocus}
                onFieldFocus={onFieldFocus}
                onFieldBlur={onFieldBlur}
                onKeyUp={onKeyUp}
                // onDeleteBlur={onDeleteBlur}
                hasError={_hasError}
                machineTypes={machineTypes}
                kitchenAreas={kitchenAreas}
                allSteps={allSteps}
                setValues={setValues}
              />
            ) : (
              <h1>Preview</h1>
            )}
          </StyledStepAccordionSummary>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default ReusableSteps;
