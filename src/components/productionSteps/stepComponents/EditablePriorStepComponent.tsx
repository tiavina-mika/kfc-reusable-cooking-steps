import React from "react";

import {
  StyledErrorMessage,
  StyledStepBodyCell,
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import { COLORS, PRODUCTION_STEPS_COL_WIDTHS } from "../../../utils/constant";
import { roundNumber } from "../../../utils/utils";
import { Box, MenuItem, Stack } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { FormikEditableStepSelect } from "./EditableStepComponent";
import { recalculateCostValues } from "../../../utils/recipeUtils";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

type Props = {
  stepComponent: Record<string, any>;
  parentStep: Record<string, any>;
  transformationModes: Record<string, any>[];
  indexComponent: number;
  indexStep: number;
  sectionIndex: number;
  indexSubComponent: number;
  isHover: boolean;
  setFieldValue: any;
};

const EditablePriorStepComponent = (
  {
    stepComponent,
    transformationModes,
    isHover,
    sectionIndex,
    indexStep,
    indexComponent,
    indexSubComponent,
    parentStep,
    setFieldValue
  },
  Props
) => {
  const supplierItem = stepComponent.supplierItem;

  const getTransformationModeAvailable = () => {
    return (
      supplierItem &&
      supplierItem.transformationModes &&
      supplierItem.transformationModes.filter(
        (transformation) =>
          transformationModes.find(
            (t) => t.objectId === transformation.transformationMode.objectId
          ) &&
          transformation.transformationMode.transformationType ===
            parentStep.transformation
      )
    );
  };

  let transformationModesOptions = getTransformationModeAvailable();

  return (
    <>
      <StyledStepFirstBodyColumn
        className="flexRow center"
        leftStep={30}
        style={{ backgroundColor: COLORS.PRODUCTION_STEPS_COMPONENT_WHITE }}
      >
        <Stack spacing={1}>
          <Box sx={{ height: 30 }} className="flexRow center">
            <Stack direction="row" spacing={4}>
              <StyledStepText weight={0} fontSize={12} disabled>
                {(supplierItem && supplierItem.name) || "-"}
              </StyledStepText>
            </Stack>
          </Box>
        </Stack>
      </StyledStepFirstBodyColumn>
      <StyledStepBodyCell align="center" width={widths[1]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {stepComponent.grossWeight
            ? roundNumber(stepComponent.grossWeight * 1000)
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[2]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {supplierItem && supplierItem.pricePerKg
            ? roundNumber(supplierItem.pricePerKg, 2) + " €"
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[3]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {stepComponent.realCost || stepComponent.realCost === 0
            ? `${roundNumber(stepComponent.realCost, 3)} €`
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[4]}>
        <StyledStepText weight={0}>
          {transformationModesOptions && isHover ? (
            <Stack className="flex1">
              <Field
                name={`sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps.stepComponents[${indexSubComponent}].transformationMode`}
                component={FormikEditableStepSelect}
                stepComponent={stepComponent}
                transformationModesOptions={transformationModesOptions}
                onChange={(e) => {
                  const transformationMode = transformationModesOptions.find(
                    (mode) =>
                      mode.transformationMode.objectId === e.target.value
                  );
                  stepComponent.transformRate =
                    transformationMode.transformationRate;
                  stepComponent.transformationMode =
                    transformationMode.transformationMode;
                  setFieldValue(
                    `sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps.stepComponents[${indexSubComponent}].transformationMode`,
                    transformationMode.transformationMode
                  );
                  stepComponent = recalculateCostValues(stepComponent);
                }}
              >
                {transformationModesOptions &&
                  transformationModesOptions.map((transformation, keyIndex) => (
                    <MenuItem
                      key={
                        keyIndex +
                        "-" +
                        transformation.transformationMode.objectId
                      }
                      value={transformation.transformationMode.objectId}
                    >
                      {transformation.transformationMode.name}
                    </MenuItem>
                  ))}
              </Field>
              <ErrorMessage
                name={`sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps.stepComponents[${indexSubComponent}].transformationMode`}
                render={(message) => (
                  <StyledErrorMessage>{message}</StyledErrorMessage>
                )}
              />
            </Stack>
          ) : (
            <StyledStepText weight={0}>
              {stepComponent.transformationMode &&
              stepComponent.transformationMode.name
                ? stepComponent.transformationMode.name
                : "-"}
            </StyledStepText>
          )}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[5]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {stepComponent.transformRate
            ? stepComponent.transformRate + " %"
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[6]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {stepComponent.netWeight
            ? roundNumber(stepComponent.netWeight, 2)
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[7]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[8]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[9]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[10]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[11]}>
        <StyledStepText weight={0} fontSize={12} disabled>
          {"-"}
        </StyledStepText>
      </StyledStepBodyCell>
    </>
  );
};

export default EditablePriorStepComponent;
