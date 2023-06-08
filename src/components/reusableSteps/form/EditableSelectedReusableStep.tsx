import React, { FC } from "react";

import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
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
  StyledStickyLastBodyColumn,
  StyledAutocomplete,
  StyledAutocompleteTextField
} from "../../productionSteps/StyledSectionComponents";
import StepNameDescription from "../../productionSteps/steps/StepNameDescription";
import {
  getTransformationTypeLabel,
  roundNumber,
  TRANSFORMATION_TYPES
} from "../../../utils/utils";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../../utils/constant";
import { getDefaultSteps, STEP_DURATION_UNITS } from "../../../utils/recipeUtils";
import { parseProductionStepsToObject } from "../../../utils/recipeUtils";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

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
  onClearFocus: () => void;
  onFieldFocus: () => void;
  onFieldBlur: () => void;
  onKeyUp: (event: any, setFieldTouched: any) => void;
  // onKeyDown: (event: any) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<any>> | Promise<void>;
  hasError: (index: number, field: string) => boolean;
  // onDeleteBlur: () => void;
  machineTypes: Record<string, any>[];
  kitchenAreas: Record<string, any>[];
  allSteps: Record<string, any>[];
  formValues: Record<string, any>;
  setValues: any;
  // computeStepsFormValues: (
  //   steps: Record<string, any>,
  // ) => void;
};

const EditableSelectedReusableStep: FC<Props> = ({
  steps,
  step,
  index,
  isEdition,
  // steps,
  // index,
  // for style
  isHover,
  // isDeleteHover,
  // genericSections,
  onClearFocus,
  onFieldFocus,
  onFieldBlur,
  onKeyUp,
  // onKeyDown
  hasError,
  machineTypes,
  kitchenAreas,
  allSteps,
  formValues,
  setValues,
  setFieldValue
  // onDeleteBlur
}) => {
  const _stopPropagation = (event) => event && event.stopPropagation();

  const getOptionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }

    if (option.get) {
      return option.get("name") || option.get("description");
    }

    return option.name || option.description;
  };

  // check if the selected value is the same as the option
  const isPointersOptionEqualToValue = (
    option: Record<string, any>,
    value: Record<string, any>
  ): boolean => {
    if (!value) return false;
    return option.objectId === value.objectId;
  };

  const _onGenericSectionChange = (event, formValue, stepIndex, reason) => {
    if (!event) return;

    let value = formValue;
    if (reason === "selectOption") {
      if (value.get) {
        value = value.get("name") || value.get("description");
      } else {
        value = value.name || value.description;
      }
    }

    const step = allSteps.find(
      (step) => (step.get ? step.get("name") : step.name) === value
    );

    const newSteps = [...steps];

    newSteps[stepIndex].name = value;

    if (reason === "selectOption" && step) {
      const newStep =
        parseProductionStepsToObject([step])[0] || getDefaultSteps();
      newSteps[stepIndex] = newStep;

      newSteps[stepIndex].error = false;
      newSteps[stepIndex].id = null;
      // newSteps[stepIndex].parentId = step.id;
      newSteps[stepIndex].parentPercent = 100;

      const newFormValues: Record<string, any> = { ...formValues };
      newFormValues.productionSteps = newSteps;
      newFormValues.name = value?.toUpperCase();

      // newSteps[stepIndex].productionSteps.forEach((step, stepIndex) => {
      //   step.stepComponents.forEach((_, ingredientIndex) => {
      //     computeProductionStepsRecipeOnFieldChange(
      //       newFormValues,
      //       stepIndex,
      //       stepIndex,
      //       ingredientIndex
      //     );
      //   });
      // });

      setValues(newFormValues);
    }

    if (reason === "input-change" && steps) {
      setFieldValue("productioinSteps", newSteps);
    }

    // if (section && !newSteps[stepIndex].parentId) {
    //   newSteps[stepIndex].parentId = null;
    //   newSteps[sectionIndex].parentPercent = 0;
    // }

    if (reason === "selectOption" && step) {
      onClearFocus();
    }

    if (event.target) {
      _stopPropagation(event);
    }
  };

  const _addStep = (index: number, event = null) => {
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, getDefaultSteps());

    // update production steps and step components data
    // const newStep = newSteps[newSteps.length - 1];
    // if (newStep) {
    //   computeStepData(newStep, "stepComponents");
    // }
    setFieldValue(`productionSteps`, newSteps);
    _stopPropagation(event);
  };

  const _removeStep = (index, event = null) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    if (!newSteps.length) {
      newSteps.splice(0, 0, getDefaultSteps());
    }

    setFieldValue("name", steps[steps.length - 1]?.name);
    setFieldValue("productionSteps", newSteps);

    // computeStepsFormValues(newSteps, sectionIndex);

    _stopPropagation(event);
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
                  {/* <Field
                    component={FormikTextFieldName}
                    name={`productionSteps[${index}].name`}
                    onClick={_stopPropagation}
                    onFocus={onFieldFocus}
                    onBlur={onFieldBlur}
                    onKeyUp={onKeyUp}
                    // onKeyDown={onKeyDown}
                  /> */}
                  <StyledAutocomplete
                    freeSolo
                    disableClearable
                    selectOnFocus
                    handleHomeEndKeys
                    inputValue={
                      typeof step.name === "string"
                        ? step.name
                        : step.get("name")
                    }
                    getOptionLabel={getOptionLabel}
                    options={allSteps}
                    onChange={(event, newInputValue, reason) => {
                      _onGenericSectionChange(
                        event,
                        newInputValue,
                        index,
                        reason
                      );
                    }}
                    onInputChange={(event, newInputValue) => {
                      _onGenericSectionChange(
                        event,
                        newInputValue,
                        index,
                        "input-change"
                      );
                    }}
                    renderInput={(params) => (
                      <StyledAutocompleteTextField
                        {...params}
                        name={`productionSteps[${index}].name`}
                        onClick={_stopPropagation}
                        onFocus={onFieldFocus}
                        onBlur={onFieldBlur}
                        onKeyUp={onKeyUp as any}
                        variant="standard"
                        fullWidth
                      />
                    )}
                  />
                </Stack>
                <ErrorMessage
                  name={`productionSteps[${index}].name`}
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
                    name={`productionSteps[${index}].description`}
                    onClick={_stopPropagation}
                    onFocus={onFieldFocus}
                    onBlur={onFieldBlur}
                    onKeyUp={onKeyUp}
                    // onKeyDown={onKeyDown}
                  />
                </Stack>
                <ErrorMessage
                  name={`productionSteps[${index}].description`}
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
            name={`productionSteps[${index}].description`}
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
              name={`productionSteps[${index}].transformation`}
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
              name={`productionSteps[${index}].transformation`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "transformation") ? (
          <ErrorMessage
            name={`productionSteps[${index}].transformation`}
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
              name={`productionSteps[${index}].kitchenArea`}
              component={FormikAutocomplete}
              options={kitchenAreas}
              isOptionEqualToValue={isPointersOptionEqualToValue}
              getOptionLabel={(option) => option.name}
              readOnly
            />
            <ErrorMessage
              name={`productionSteps[${index}].kitchenArea`}
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
              name={`productionSteps[${index}].machineType`}
              component={FormikAutocomplete}
              options={machineTypes}
              isOptionEqualToValue={isPointersOptionEqualToValue}
              getOptionLabel={(option) => option.name}
              readOnly
            />
            <ErrorMessage
              name={`productionSteps[${index}].machineType`}
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
              name={`productionSteps[${index}].machineSetting`}
              onClick={_stopPropagation}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
              onKeyUp={onKeyUp}
            />
            <ErrorMessage
              name={`productionSteps[${index}].machineSetting`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "machineSetting") ? (
          <ErrorMessage
            name={`productionSteps[${index}].machineSetting`}
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
              name={`productionSteps[${index}].stepDuration`}
              onClick={_stopPropagation}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
              onKeyUp={onKeyUp}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <ErrorMessage
              name={`productionSteps[${index}].stepDuration`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "stepDuration") ? (
          <ErrorMessage
            name={`productionSteps[${index}].stepDuration`}
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
              name={`productionSteps[${index}].stepDurationUnit`}
              component={FormikSelect}
            >
              {STEP_DURATION_UNITS.map((unit, index) => (
                <MenuItem key={unit + index} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage
              name={`productionSteps[${index}].stepDurationUnit`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "stepDurationUnit") ? (
          <ErrorMessage
            name={`productionSteps[${index}].stepDurationUnit`}
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

export default EditableSelectedReusableStep;
