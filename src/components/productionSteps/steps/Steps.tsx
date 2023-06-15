import React, { FC, Fragment } from "react";

import styled from "@emotion/styled";
import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box
} from "@mui/material";

import { reusableSteps } from "../../../utils/data/reusableSteps";
import { COLORS, PRODUCTION_STEPS_SPACINGS } from "../../../utils/constant";
import StepPreview from "./StepPreview";
import EditableStep from "./EditableStep";
import { IHoveredRow } from "../sections/Sections";
import ReusableStepFormRow from "../../reusableSteps/ReusableStepFormRow";

export const COMPONENT_NAME = "STEPS";

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// -------------- Table -------------- //

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

type StyledAccordionSummaryProps = {
  expandedIconLeftStep?: number;
};
const StyledAccordionSummary = styled(
  (props: AccordionSummaryProps) => <AccordionSummary {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "expandedIconLeftStep"
  }
)<StyledAccordionSummaryProps>(({ expandedIconLeftStep = 0 }) => ({
  flexDirection: "row-reverse",
  position: "relative",
  // opened and closed expanded icon
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded,& .MuiAccordionSummary-expandIconWrapper": {
    position: "sticky",
    left:
      PRODUCTION_STEPS_SPACINGS.ACCORDION_EXPANDED_ICON_LEFT +
      PRODUCTION_STEPS_SPACINGS.STEP_FIRST_COL_PL_DIFF +
      expandedIconLeftStep
  },
  // row
  "& .MuiAccordionSummary-content": {
    padding: 0,
    margin: 0,
    borderBottom: "1px solid #cccccc",
    marginLeft: -28, // important! for the summary to not take account of the expand icon space
    backgroundColor: COLORS.PRODUCTION_STEPS_GREY
  }
}));

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
  sectionIndex?: number;
  onRowHover: (
    component: string,
    index: number,
    parendIndex?: number | null
  ) => void;
  onRowBlur: () => void;
  hoveredRow: IHoveredRow;
  // genericSections?: Record<string, any>[];
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
  hasError: (index: number, field: string, sectionIndex?: number) => boolean;
  computeStepsFormValues?: (
    steps: Record<string, any>,
    sectionIndex: number
  ) => void;
  computeReusableStepsFormValues?: (steps: Record<string, any>) => void;
  isReusable?: boolean;

  formValues?: Record<string, any>;
  setValues?: any;
  onClearFocus?: () => void;
  fromRecipe?: boolean;
};

const Steps: FC<Props> = ({
  steps,
  isEdition,
  sectionIndex,
  onRowHover,
  onRowBlur,
  hoveredRow,
  // genericSections,
  // onClearFocus,
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
  computeStepsFormValues,
  computeReusableStepsFormValues,
  hasError,
  isReusable,

  setValues,
  formValues,
  onClearFocus,
  fromRecipe = true
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
    hoveredRow.index === index &&
    hoveredRow.parentIndex === sectionIndex;

  // const _isDeleteHover = (index: number): boolean => {
  //   return (
  //     deleteHover &&
  //     COMPONENT_NAME === deleteHover.component &&
  //     deleteHover.index === index
  //   );
  // };

  const _hasError = (index: number, field: string) => {
    // return errors.sections?.[sectionIndex]?.productionSteps[index]?.[field];
    return hasError(index, field, sectionIndex);
  };

  return (
    <Box className="flexColumn" sx={{ position: "relative" }}>
      {steps.map((step, index) => (
        <Fragment key={index}>
          {step.isReusable ? (
            <ReusableStepFormRow
              onRowHover={onRowHover}
              onRowBlur={onRowBlur}
              hoveredRow={hoveredRow}
              onFieldFocus={onFieldFocus}
              onFieldBlur={onFieldBlur}
              onKeyUp={onKeyUp}
              errors={errors}
              machineTypes={machineTypes}
              kitchenAreas={kitchenAreas}
              setFieldValue={setFieldValue}
              stepValues={
                formValues.sections[sectionIndex].productionSteps[index] || []
              }
              setValues={setValues}
            />
          ) : (
            <>
              {isReusable && <StyledLeftBar />}
              <StyledAccordion
                elevation={0}
                defaultExpanded
                square
                disableGutters
              >
                <StyledAccordionSummary
                  expandIcon={
                    <img alt="chevron" src="/icons/chevron-down.svg" />
                  }
                  onMouseEnter={() =>
                    onRowHover(COMPONENT_NAME, index, sectionIndex)
                  }
                  onMouseLeave={onRowBlur}
                >
                  {isEdition ? (
                    <EditableStep
                      steps={steps}
                      step={step}
                      index={index}
                      isEdition={isEdition}
                      // index={index}
                      isHover={_isHover(index)}
                      sectionIndex={sectionIndex}
                      // isDeleteHover={_isDeleteHover(index)}
                      // genericSections={genericSections}
                      setFieldValue={setFieldValue}
                      onFieldFocus={onFieldFocus}
                      onFieldBlur={onFieldBlur}
                      onKeyUp={onKeyUp}
                      // onDeleteBlur={onDeleteBlur}
                      hasError={_hasError}
                      machineTypes={machineTypes}
                      kitchenAreas={kitchenAreas}
                      computeStepsFormValues={computeStepsFormValues}
                      computeReusableStepsFormValues={
                        computeReusableStepsFormValues
                      }
                      // onAddStep={handleAddStep}
                      isReusable={isReusable}
                      // isReusable={isReusable}
                      allReusableSteps={reusableSteps}
                      onClearFocus={onClearFocus}
                      setValues={setValues}
                      formValues={formValues}
                      fromRecipe={fromRecipe}
                    />
                  ) : (
                    <StepPreview step={step} index={index} />
                  )}
                </StyledAccordionSummary>
              </StyledAccordion>
            </>
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default Steps;
