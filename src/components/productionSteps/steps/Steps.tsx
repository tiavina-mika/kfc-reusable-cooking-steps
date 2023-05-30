import React, { FC } from "react";

import styled from "@emotion/styled";
import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box
} from "@mui/material";

import { COLORS, PRODUCTION_STEPS_SPACINGS } from "../../../utils/constant";
import StepPreview from "./StepPreview";
import EditableStep from "./EditableStep";
import { IHoveredRow } from "../sections/Sections";
import { FormikErrors } from "formik";

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

type Props = {
  steps: Record<string, any>[];
  isEdition: boolean;
  sectionIndex: number;
  onRowHover: (
    component: string,
    index: number,
    parendIndex?: number | null
  ) => void;
  onRowBlur: () => void;
  hoveredRow: IHoveredRow;
  // genericSections?: Record<string, any>[];
  // onClearFocus: () => void;
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
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<any>> | Promise<void>;
  // onDeleteBlur: () => void;
  machineTypes: Record<string, any>[];
  kitchenAreas: Record<string, any>[];
  computeStepsFormValues: (steps: Record<string, any>, sectionIndex: number) => void;
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
  computeStepsFormValues
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
    return errors.sections?.[sectionIndex]?.productionSteps[index]?.[field];
  };

  return (
    <Box className="flexColumn">
      {steps.map((step, index) => (
        <StyledAccordion
          elevation={0}
          defaultExpanded
          square
          disableGutters
          key={index}
        >
          <StyledAccordionSummary
            expandIcon={<img alt="chevron" src="/icons/chevron-down.svg" />}
            onMouseEnter={() => onRowHover(COMPONENT_NAME, index, sectionIndex)}
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
                // onClearFocus={onClearFocus}
                onFieldFocus={onFieldFocus}
                onFieldBlur={onFieldBlur}
                onKeyUp={onKeyUp}
                // onDeleteBlur={onDeleteBlur}
                hasError={_hasError}
                machineTypes={machineTypes}
                kitchenAreas={kitchenAreas}
                computeStepsFormValues={computeStepsFormValues}
              />
            ) : (
              <StepPreview step={step} index={index} />
            )}
          </StyledAccordionSummary>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default Steps;
