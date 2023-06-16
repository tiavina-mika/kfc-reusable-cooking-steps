import React, { Fragment, useCallback } from "react";

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
import StepComponentPreview from "../stepComponents/StepComponentPreview";
import EditableStepComponent from "../stepComponents/EditableStepComponent";
import EditablePriorStepComponent from "../stepComponents/EditablePriorStepComponent";
import PriorStepComponentPreview from "../stepComponents/PriorStepComponentPreview";

export const COMPONENT_NAME = "STEPS";
export const PRODUCTION_STEPS_COMPONENT_NAME = "PRODUCTION_STEPS";
export const PRODUCTION_STEPS_PRIOR_COMPONENT_NAME =
  "PRODUCTION_STEPS_PRIOR_COMPONENT";

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
    parendIndex?: number | null,
    stepComponentIndex?: number | null,
    indexSubComponent?: number | null
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
  allReusableSteps: Record<string, any>[];
  supplierItems: Record<string, any>[];
  transformationModes: Record<string, any>[];
  handleChange?: any;
};

const Steps = ({
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
  hasError,
  machineTypes,
  kitchenAreas,
  setFieldValue,
  computeStepsFormValues,
  supplierItems,
  transformationModes,
  handleChange,
  isReusable,
  computeReusableStepsFormValues,

  errors,
  setValues,
  formValues,
  onClearFocus,
  allReusableSteps,
  fromRecipe = true
}: Props) => {
  const _isStepHover = (index) => {
    return (
      hoveredRow &&
      COMPONENT_NAME === hoveredRow.component &&
      hoveredRow.index === index &&
      hoveredRow.parentIndex === sectionIndex
    );
  };

  const _isStepComponentHover = (index, componentIndex, subComponentIndex) => {
    if (hoveredRow) {
      if (PRODUCTION_STEPS_COMPONENT_NAME === hoveredRow.component) {
        return (
          hoveredRow.index === index &&
          hoveredRow.parentIndex === sectionIndex &&
          hoveredRow.componentIndex === componentIndex
        );
      } else if (
        PRODUCTION_STEPS_PRIOR_COMPONENT_NAME === hoveredRow.component
      ) {
        return (
          hoveredRow.index === index &&
          hoveredRow.parentIndex === sectionIndex &&
          hoveredRow.componentIndex === componentIndex &&
          hoveredRow.priorComponentIndex === subComponentIndex
        );
      }
    }

    return false;
  };

  const _hasError = useCallback(
    (index: number, field: string) => {
      return hasError(index, field, sectionIndex);
    },
    [sectionIndex, hasError]
  );

  // TODO: should be removed? It's already added in form initial values or when adding a new step
  // steps.forEach(step => {
  //   if (step.stepComponents.length === 0) {
  //     step.stepComponents.push(getEmptyStepComponent())
  //   }
  // })

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
                      isHover={_isStepHover(index)}
                      sectionIndex={sectionIndex}
                      onFieldFocus={onFieldFocus}
                      onFieldBlur={onFieldBlur}
                      onKeyUp={onKeyUp}
                      hasError={_hasError}
                      machineTypes={machineTypes}
                      kitchenAreas={kitchenAreas}
                      setFieldValue={setFieldValue}
                      computeStepsFormValues={computeStepsFormValues}
                      isReusable={isReusable}
                      computeReusableStepsFormValues={
                        computeReusableStepsFormValues
                      }
                      fromRecipe={fromRecipe}
                      onClearFocus={onClearFocus}
                      allReusableSteps={allReusableSteps}
                      formValues={formValues}
                      setValues={setValues}
                    />
                  ) : (
                    <StepPreview step={step} index={index} />
                  )}
                </StyledAccordionSummary>
                {step.stepComponents.map(
                  (stepComponent, indexComponent) =>
                    /** START SUPPLIER ITEM STEP COMPONENT CASE **/
                    (stepComponent.emptyComponent &&
                      !stepComponent.priorSteps) ||
                    stepComponent.supplierItem ? (
                      <StyledAccordion
                        elevation={0}
                        defaultExpanded
                        square
                        disableGutters
                        key={indexComponent}
                        sx={{ backgroundColor: "#fff" }}
                      >
                        <StyledAccordionSummary
                          onMouseEnter={() =>
                            onRowHover(
                              PRODUCTION_STEPS_COMPONENT_NAME,
                              index,
                              sectionIndex,
                              indexComponent
                            )
                          }
                          onMouseLeave={onRowBlur}
                          // componentName={PRODUCTION_STEPS_COMPONENT_NAME}
                        >
                          {isEdition ? (
                            <EditableStepComponent
                              steps={steps}
                              sectionIndex={sectionIndex}
                              hasError={_hasError}
                              stepComponent={stepComponent}
                              stepComponents={step.stepComponents}
                              parentStep={step}
                              indexComponent={indexComponent}
                              indexStep={index}
                              supplierItems={supplierItems}
                              transformationModes={transformationModes}
                              handleChange={handleChange}
                              setFieldValue={setFieldValue}
                              isHover={_isStepComponentHover(
                                index,
                                indexComponent
                              )}
                            />
                          ) : (
                            <StepComponentPreview
                              stepComponent={stepComponent}
                              supplierItem={
                                stepComponent && stepComponent.supplierItem
                              }
                            />
                          )}
                        </StyledAccordionSummary>
                      </StyledAccordion>
                    ) : /** END SUPPLIER ITEM STEP COMPONENT CASE **/
                    /** START PRIOR STEPS COMPONENT CASE **/
                    stepComponent.priorSteps ? (
                      <StyledAccordion
                        elevation={0}
                        defaultExpanded
                        square
                        disableGutters
                        key={indexComponent + stepComponent.priorSteps.objectId}
                        sx={{
                          backgroundColor: "#fff"
                        }}
                      >
                        <StyledAccordionSummary
                          onMouseEnter={() =>
                            onRowHover(
                              PRODUCTION_STEPS_COMPONENT_NAME,
                              index,
                              sectionIndex,
                              indexComponent
                            )
                          }
                          onMouseLeave={onRowBlur}
                          // componentName={PRODUCTION_STEPS_COMPONENT_NAME}
                        >
                          {isEdition ? (
                            <EditableStepComponent
                              steps={steps}
                              sectionIndex={sectionIndex}
                              hasError={_hasError}
                              stepComponent={stepComponent}
                              stepComponents={step.stepComponents}
                              parentStep={step}
                              indexComponent={indexComponent}
                              indexStep={index}
                              supplierItems={supplierItems}
                              transformationModes={transformationModes}
                              handleChange={handleChange}
                              setFieldValue={setFieldValue}
                              isHover={_isStepComponentHover(
                                index,
                                indexComponent
                              )}
                            />
                          ) : (
                            <PriorStepComponentPreview
                              stepComponent={stepComponent}
                              index={indexComponent}
                            />
                          )}
                        </StyledAccordionSummary>
                        {stepComponent.priorSteps.stepComponents.map(
                          (subStepComponent, indexSubComponent) => (
                            <StyledAccordionSummary
                              key={indexSubComponent}
                              onMouseEnter={() =>
                                onRowHover(
                                  PRODUCTION_STEPS_PRIOR_COMPONENT_NAME,
                                  index,
                                  sectionIndex,
                                  indexComponent,
                                  indexSubComponent
                                )
                              }
                              onMouseLeave={onRowBlur}
                              // componentName={PRODUCTION_STEPS_PRIOR_COMPONENT_NAME}
                            >
                              {isEdition ? (
                                <EditablePriorStepComponent
                                  sectionIndex={sectionIndex}
                                  stepComponent={subStepComponent}
                                  indexComponent={indexComponent}
                                  indexStep={index}
                                  parentStep={step}
                                  indexSubComponent={indexSubComponent}
                                  transformationModes={transformationModes}
                                  isHover={_isStepComponentHover(
                                    index,
                                    indexComponent,
                                    indexSubComponent
                                  )}
                                  setFieldValue={setFieldValue}
                                />
                              ) : (
                                <StepComponentPreview
                                  key={indexComponent + "-" + indexSubComponent}
                                  stepComponent={subStepComponent}
                                  supplierItem={subStepComponent.supplierItem}
                                  subComponent
                                />
                              )}
                            </StyledAccordionSummary>
                          )
                        )}
                      </StyledAccordion>
                    ) : null
                  /** END PRIOR STEPS COMPONENT CASE **/
                )}
              </StyledAccordion>
            </>
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default Steps;
