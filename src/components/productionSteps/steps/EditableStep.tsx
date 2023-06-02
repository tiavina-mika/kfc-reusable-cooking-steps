import React, { FC, useCallback } from "react";

import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  styled
} from "@mui/material";
import { ErrorMessage, Field, FormikErrors } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  StyledErrorMessage,
  StyledProductionStepInputBase,
  StyledProductionStepTextField,
  StyledStepBodyCell,
  StyledStepFirstBodyColumn,
  StyledStepText,
  StyledProductionStepsTextarea,
  StyledStickyLastBodyColumn
} from "../StyledSectionComponents";
import StepNameDescription from "./StepNameDescription";
import {
  getTransformationTypeLabel,
  roundNumber,
  TRANSFORMATION_TYPES
} from "../../../utils/utils";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../../utils/constant";
import {
  computeStepData,
  getDefaultSteps,
  STEP_DURATION_UNITS
} from "../../../utils/recipeUtils";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

const StyledTextFieldName = styled(StyledProductionStepTextField)({
  width: 460,
  "& .MuiInputBase-root": {
    height: "100%"
  }
});

const FormikTextFieldName = ({ field, ...props }) => {
  return <StyledTextFieldName {...field} {...props} />;
};

const FormikTextField = ({ field, ...props }) => (
  <StyledProductionStepTextField {...field} {...props} />
);

const FormikTextarea = ({ field, ...props }) => (
  <StyledProductionStepsTextarea {...field} {...props} />
);

const autocompleteSx = {
  textField: {
    "& .MuiInput-input": {
      cursor: "pointer"
    }
  }
};
const FormikAutocomplete = ({ form, field, readOnly = false, ...props }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Autocomplete
      {...props}
      sx={{ flex: 1, pointer: "cursor" }}
      options={props.options}
      value={value}
      onChange={(_, newValue: Record<string, any>) => {
        setFieldValue(name, newValue);
      }}
      renderInput={(params) => (
        <StyledProductionStepTextField
          {...params}
          variant="standard"
          fullWidth
          inputProps={{ ...params.inputProps, readOnly }}
          sx={readOnly ? autocompleteSx.textField : null}
        />
      )}
    />
  );
};

const FormikSelect = ({ form, field, children, ...props }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      {...props}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      variant="standard"
      input={<StyledProductionStepInputBase />}
    >
      {children}
    </Select>
  );
};

type Props = {
  step: Record<string, any>;
  index: number;
  isEdition?: boolean;
  steps: Record<string, any>[];
  // index: number;
  isHover: boolean;
  // isDeleteHover: boolean;
  // genericSections?: Record<string, any>[];
  // onClearFocus: () => void;
  onFieldFocus: () => void;
  onFieldBlur: (event?: any) => void;
  onKeyUp: (event: any, setFieldTouched: any) => void;
  // onKeyDown: (event: any) => void;
  sectionIndex: number;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<any>> | Promise<void>;
  hasError: (index: number, field: string) => boolean;
  // onDeleteBlur: () => void;
  machineTypes: Record<string, any>[];
  kitchenAreas: Record<string, any>[];
  computeStepsFormValues?: (
    steps: Record<string, any>,
    sectionIndex: number
  ) => void;
  computeReusableStepsFormValues?: (steps: Record<string, any>) => void;
  // onAddStep?: (value: any) => void;
  isReusable?: boolean;
};

const EditableStep: FC<Props> = ({
  steps,
  step,
  index,
  isEdition,
  sectionIndex,
  // steps,
  // index,
  // for style
  isHover,
  // isDeleteHover,
  // genericSections,
  setFieldValue,
  // onClearFocus,
  onFieldFocus,
  onFieldBlur,
  onKeyUp,
  // onKeyDown
  hasError,
  machineTypes,
  kitchenAreas,
  computeStepsFormValues,
  computeReusableStepsFormValues,
  isReusable
  // onAddStep,
  // onDeleteBlur
}) => {
  const _stopPropagation = (event) => event && event.stopPropagation();

  const getFieldName = useCallback(
    (fieldName: string): string => {
      if (isReusable) {
        return `productionSteps[${index}].${fieldName}`;
      }
      return `sections[${sectionIndex}].productionSteps[${index}].${fieldName}`;
    },
    [index, sectionIndex, isReusable]
  );

  // check if the selected value is the same as the option
  const isPointersOptionEqualToValue = (
    option: Record<string, any>,
    value: Record<string, any>
  ): boolean => {
    if (!value) return false;
    return option.objectId === value.objectId;
  };

  const _addStep = (index: number, event = null) => {
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, getDefaultSteps());

    // update production steps and step components data
    const newStep = newSteps[newSteps.length - 1];
    if (newStep) {
      computeStepData(newStep, "stepComponents");
    }
    if (isReusable) {
      setFieldValue("productionSteps", newSteps);

      const newLastStep = newSteps[newSteps.length - 1];
      if (newLastStep) {
        setFieldValue("name", newLastStep?.name?.toUpperCase());
      }
    } else {
      setFieldValue(`sections[${sectionIndex}].productionSteps`, newSteps);
    }
    // setFieldValue(`sections[${sectionIndex}].productionSteps`, newSteps);
    _stopPropagation(event);
  };

  const _removeStep = (index, event) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    if (!newSteps.length) {
      newSteps.splice(0, 0, getDefaultSteps());
    }

    if (computeStepsFormValues) {
      computeStepsFormValues(newSteps, sectionIndex);
    }

    if (computeReusableStepsFormValues) {
      computeReusableStepsFormValues(newSteps);
    }

    // the reusable step name should always be the last step name
    if (isReusable) {
      const newLastStep = newSteps[newSteps.length - 1];
      if (newLastStep) {
        setFieldValue("name", newLastStep?.name.toUpperCase());
      }
    }

    if (!event) return;
    _stopPropagation(event);
  };

  // change the reusable step name by the last step child name
  const handleNameBlur = (event) => {
    if (isReusable) {
      const lastStep = steps[steps.length - 1];
      const currentStep = steps[index];
      if (currentStep.name && lastStep?.index === currentStep.index) {
        const name =  steps[index].name
        setFieldValue("name", name.toUpperCase());
      }
    }

    if (!event) return;
    onFieldBlur(event);
  };

  return (
    <Box
      sx={{
        display: "flex"
      }}
      onClick={_stopPropagation}
    >
      {/* ------------ name and description ------------ */}
      <StyledStepFirstBodyColumn className="flexCol">
        {isHover ? (
          <>
            {/* add button */}
            <Button
              onClick={(e) => _addStep(index, e)}
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
              <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <StyledStepText>{index + 1}.</StyledStepText>
                  <Field
                    component={FormikTextFieldName}
                    name={getFieldName("name")}
                    onClick={_stopPropagation}
                    onFocus={onFieldFocus}
                    onBlur={handleNameBlur}
                    onKeyUp={onKeyUp}
                  />
                </Stack>
                <ErrorMessage
                  name={getFieldName("name")}
                  render={(message) => (
                    <StyledErrorMessage>{message}</StyledErrorMessage>
                  )}
                />
              </Stack>
              <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* <StyledStepDescriptionText>
                    Instructions :
                  </StyledStepDescriptionText> */}
                  <Field
                    component={FormikTextarea}
                    name={getFieldName("description")}
                    onClick={_stopPropagation}
                    onFocus={onFieldFocus}
                    onBlur={onFieldBlur}
                    onKeyUp={onKeyUp}
                    // onKeyDown={onKeyDown}
                  />
                </Stack>
                <ErrorMessage
                  name={getFieldName("name")}
                  render={(message) => (
                    <StyledErrorMessage>{message}</StyledErrorMessage>
                  )}
                />
              </Stack>
            </Stack>
          </>
        ) : (
          <StepNameDescription
            name={step.name}
            description={
              isEdition && step.error
                ? "Instructions :" + step.description
                : step.description
            }
            index={index}
          />
        )}
        {/* error message while not on hover */}
        {!isHover && hasError(index, "description") && (
          <ErrorMessage
            name={getFieldName("description")}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        )}
      </StyledStepFirstBodyColumn>
      <StyledStepBodyCell align="left" width={widths[1]}>
        <StyledStepText>{step.inputWeight || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[2]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[3]}>
        <StyledStepText>
          {step.cost ? `${roundNumber(step.cost, 3)} €` : "_"}
        </StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ transformation ------------ */}
      <StyledStepBodyCell align="left" width={widths[4]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              name={getFieldName("transformation")}
              component={FormikSelect}
            >
              {TRANSFORMATION_TYPES.map((transformation) => (
                <MenuItem
                  key={transformation.value}
                  value={transformation.value}
                >
                  {transformation.label}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage
              name={getFieldName("transformation")}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "transformation") ? (
          <ErrorMessage
            name={getFieldName("transformation")}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>
            {getTransformationTypeLabel(step.transformation) || "-"}
          </StyledStepText>
        )}
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[5]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[6]}>
        <StyledStepText>{step.outputWeight || "-"}</StyledStepText>
      </StyledStepBodyCell>
      {/* <StyledStepBodyCell align="left" width={widths[7]}>
        <StyledStepText>{step.kitchenArea?.name || "-"}</StyledStepText>
      </StyledStepBodyCell> */}
      {/* ------------ kitchenArea ------------ */}
      <StyledStepBodyCell align="left" width={widths[7]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              name={getFieldName("kitchenArea")}
              component={FormikAutocomplete}
              options={kitchenAreas}
              isOptionEqualToValue={isPointersOptionEqualToValue}
              getOptionLabel={(option) => option.name}
              readOnly
            />
            <ErrorMessage
              name={getFieldName("kitchenArea")}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : (
          <StyledStepText>{step.kitchenArea?.name || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* ------------ machineType ------------ */}
      <StyledStepBodyCell align="left" width={widths[8]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              name={getFieldName("machineType")}
              component={FormikAutocomplete}
              options={machineTypes}
              isOptionEqualToValue={isPointersOptionEqualToValue}
              getOptionLabel={(option) => option.name}
              readOnly
            />
            <ErrorMessage
              name={getFieldName("machineType")}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : (
          <StyledStepText>{step.machineType?.name || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* ------------ machineSetting ------------ */}
      <StyledStepBodyCell align="left" width={widths[9]}>
        {isHover ? (
          <Stack>
            <Field
              component={FormikTextField}
              name={getFieldName("machineSetting")}
              onClick={_stopPropagation}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
              onKeyUp={onKeyUp}
            />
            <ErrorMessage
              name={getFieldName("machineSetting")}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "machineSetting") ? (
          <ErrorMessage
            name={getFieldName("machineSetting")}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>{step.machineSetting || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* ------------ stepDuration ------------ */}
      <StyledStepBodyCell align="left" width={widths[10]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              type="number"
              component={FormikTextField}
              name={getFieldName("stepDuration")}
              onClick={_stopPropagation}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
              onKeyUp={onKeyUp}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <ErrorMessage
              name={getFieldName("stepDuration")}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "stepDuration") ? (
          <ErrorMessage
            name={getFieldName("stepDuration")}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>{step.stepDuration || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* ------------ stepDurationUnit ------------ */}
      <StyledStepBodyCell align="left" width={widths[11]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              name={getFieldName("stepDurationUnit")}
              component={FormikSelect}
            >
              {STEP_DURATION_UNITS.map((unit, index) => (
                <MenuItem key={unit + index} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage
              name={getFieldName("stepDurationUnit")}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "stepDurationUnit") ? (
          <ErrorMessage
            name={getFieldName("stepDurationUnit")}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>{step.stepDurationUnit || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* -------- delete icon -------- */}
      <StyledStickyLastBodyColumn type="step" addBackground={isHover}>
        {isHover && (
          <IconButton
            onClick={(e) => _removeStep(index, e)}
            className="flexCenter"
            disableRipple
          >
            <DeleteIcon />
          </IconButton>
        )}
      </StyledStickyLastBodyColumn>
    </Box>
  );
};

export default EditableStep;
