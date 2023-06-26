import React, { useState, useEffect, MouseEvent, useMemo, useRef } from "react";

import { ErrorMessage, Field } from "formik";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack
} from "@mui/material";
import {
  StyledErrorMessage,
  StyledProductionStepTextField,
  StyledStepBodyCell,
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import { roundNumber } from "../../../utils/utils";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../../utils/constant";
import {
  getEmptyStepComponent,
  resetStepComponent,
  recalculateCostValues,
  searchSupplierItemsAutocomplete,
  getDefaultStepComponents
} from "../../../utils/recipeUtils";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { debounce } from "lodash";
import RemoveColumn from "../RemoveColumn";

const widths = PRODUCTION_STEPS_COL_WIDTHS;
const FormikTextField = ({ field, ...props }) => (
  <StyledProductionStepTextField {...field} {...props} />
);

const autocompleteSx = {
  textField: {
    "& .MuiInput-input": {
      cursor: "pointer"
    }
  }
};

const FormikAutocomplete = ({
  form,
  loading,
  field,
  readOnly = false,
  supplierItems,
  priorSteps,
  category,
  ...props
}) => {
  const { value } = field;
  const { handleChange } = form;

  const currentValue =
    value && category === "SUPPLIER_ITEM"
      ? supplierItems.find((supplierItem) => supplierItem.objectId === value.id)
      : value &&
        priorSteps.find((priorStep) => priorStep.data.objectId === value.id);

  return (
    <Autocomplete
      {...props}
      sx={{ flex: 1, pointer: "cursor" }}
      options={props.options}
      value={currentValue}
      groupBy={(option) => option.category}
      renderInput={(params) => (
        <StyledProductionStepTextField
          {...params}
          variant="standard"
          fullWidth
          sx={readOnly ? autocompleteSx.textField : null}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            // readOnly,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};

export const FormikEditableStepSelect = ({
  field,
  children,
  readOnly = false,
  ...props
}) => {
  const { name, value } = field;

  return (
    <Select
      {...props}
      name={name}
      value={value && value.objectId}
      renderInput={(params) => (
        <StyledProductionStepTextField
          {...params}
          variant="standard"
          fullWidth
          InputProps={{ ...params.inputProps, readOnly }}
          sx={readOnly ? autocompleteSx.textField : null}
        />
      )}
    >
      {children}
    </Select>
  );
};

type Props = {
  stepComponent: Record<string, any>;
  stepComponents: Record<string, any>[];
  steps: Record<string, any>[];
  parentStep: Record<string, any>;
  transformationModes: Record<string, any>[];
  indexComponent: number;
  indexStep: number;
  sectionIndex: number;
  supplierItems: Record<string, any>[];
  isHover: boolean;
  hasError: (index: number, field: string) => boolean;
  handleChange: any;
  setFieldValue: any;
  isStepReusabe?: boolean;
  fromRecipe?: boolean;
  computeStepComponentsFormValues?: (stepComponents: Record<string, any>, stepIndex: number) => void;
};

const EditableStepComponent = ({
  stepComponent,
  stepComponents,
  steps,
  parentStep,
  transformationModes,
  indexComponent,
  indexStep,
  sectionIndex,
  supplierItems = [],
  isHover,
  hasError,
  handleChange,
  fromRecipe,
  setFieldValue,
  computeStepComponentsFormValues,
}: Props) => {
  const _stopPropagation = (event) => event && event.stopPropagation();
  const [supplierItemsOptions, setSupplierItemsOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priorSteps, setPriorSteps] = useState([]);

  useEffect(() => {
    let priorSteps = [];
    let found = false;
    steps.forEach((step) => {
      if (step.stepComponents && step.stepComponents.length > 0) {
        if (
          !found &&
          !step.stepComponents.find(
            (currentStepComponent) =>
              currentStepComponent.index === stepComponent.index
          )
        ) {
          priorSteps.push({
            name: step.name ? step.name : "NO_NAME",
            value: step.objectId,
            data: step,
            category: "Résultat d'étapes antérieures",
            categoryId: "PRIOR_STEPS"
          });
        } else {
          found = true;
        }
      }
    });

    setPriorSteps(priorSteps);
    setSupplierItemsOptions([...priorSteps, ...supplierItemsOptions]);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [steps]);

  let supplierItem = stepComponent.supplierItem;
  const updateNetWeight = (event) => {
    stepComponent.netWeight = event.target.value;
    stepComponent = recalculateCostValues(stepComponent);
    handleChange(event);
  };

  const _addStepComponent = (index: number, event = null) => {
    const newStepComponents = [...stepComponents];

    newStepComponents.splice(index + 1, 0, getEmptyStepComponent());

    if (fromRecipe) {
      setFieldValue(
        `sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents`,
        newStepComponents
      );
    } else {
      setFieldValue(
        `productionSteps[${indexStep}].stepComponents`,
        newStepComponents
      );
    }

    _stopPropagation(event);
  };

  const _removeStepComponent = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    const newStepComponents = [...stepComponents];
    newStepComponents.splice(index, 1);
    if (!newStepComponents.length) {
      newStepComponents.splice(0, 0, getDefaultStepComponents());
    }

    if (computeStepComponentsFormValues) {
      computeStepComponentsFormValues(newStepComponents, indexStep);
    }

    _stopPropagation(event);
  };

  const clearStepComponentTransformationMode = (
    stepComponentTransformationModeName
  ) => {
    stepComponent.transformationMode = null;
    setFieldValue(stepComponentTransformationModeName, null);
  };

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

  const onChangeAutocomplete = useRef((newValue) => {
    stepComponent = resetStepComponent(stepComponent);
    newValue.data.id = newValue.data.objectId;
    const priorStepFieldName = fromRecipe
      ? `sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps`
      : `productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps`;

    const supplierItemFieldName = fromRecipe
      ? `sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].supplierItem`
      : `productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps`;

    if (newValue.categoryId === "PRIOR_STEPS") {
      stepComponent.priorSteps = newValue.data;
      setFieldValue(priorStepFieldName, newValue.data);

      setFieldValue(supplierItemFieldName, null);
      return;
    }

    supplierItem = newValue.data;
    stepComponent.supplierItem = supplierItem;
    setFieldValue(priorStepFieldName, null);
    setFieldValue(supplierItemFieldName, newValue.data);
    stepComponent = recalculateCostValues(stepComponent);
  }).current;

  const searchingSupplier = useRef(
    debounce(async (event) => {
      if (event && event.type === "change") {
        setLoading(true);
        const supplierItems = await searchSupplierItemsAutocomplete(
          event.target.value
        );
        const result = [
          ...priorSteps,
          ...supplierItems.map((supplierItem) => ({
            name: supplierItem.name.toLowerCase(),
            value: supplierItem.objectId,
            data: supplierItem,
            category: "Articles fournisseurs",
            categoryId: "SUPPLIER_ITEM"
          }))
        ];
        setSupplierItemsOptions(result);
        setLoading(false);
      }
    }, 700)
  ).current;

  const stepComponentArticleFormName = useMemo(() => {
    if (fromRecipe) {
      return stepComponent.supplierItem
        ? `sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].supplierItem`
        : `sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps`;
    }
    return stepComponent.supplierItem
      ? `productionSteps[${indexStep}].stepComponents[${indexComponent}].supplierItem`
      : `productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps`;
  }, [fromRecipe, indexStep, indexComponent, sectionIndex, stepComponent]);

  const stepComponentTransformationModeName = useMemo(() => {
    return fromRecipe
      ? `sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].transformationMode`
      : `productionSteps[${indexStep}].stepComponents[${indexComponent}].transformationMode`;
  }, [fromRecipe, sectionIndex, indexComponent, indexStep]);

  return (
    <Box
      sx={{
        display: "flex"
      }}
      onClick={_stopPropagation}
    >
      <StyledStepFirstBodyColumn
        className="flexRow center"
        style={{ backgroundColor: "#fff" }}
      >
        {isHover && (
          <Button
            onClick={(e) => _addStepComponent(indexComponent, e)}
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
        )}
        <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
          <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              {isHover ? (
                <Field
                  name={stepComponentArticleFormName}
                  loading={loading}
                  component={FormikAutocomplete}
                  options={supplierItemsOptions}
                  supplierItems={supplierItems}
                  stepComponent={stepComponent}
                  isOptionEqualToValue={(option, value) =>
                    value && option.value === value.value
                  }
                  priorSteps={priorSteps}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => onChangeAutocomplete(newValue)}
                  onInputChange={searchingSupplier}
                  category={
                    stepComponent.supplierItem ? "SUPPLIER_ITEM" : "PRIOR_STEPS"
                  }
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      key={`parent-${
                        parentStep && parentStep.objectId
                      }-${sectionIndex}-${indexStep}-${indexComponent}-${
                        stepComponent.priorSteps &&
                        stepComponent.priorSteps.objectId
                      }-${option.value}`}
                    >
                      {option.name}
                    </li>
                  )}
                  disableClearable
                  key={`parent-${
                    parentStep && parentStep.objectId
                  }-${sectionIndex}-step-${indexStep}-component-${indexComponent}-${
                    stepComponent.priorSteps &&
                    stepComponent.priorSteps.objectId
                  }`}
                />
              ) : (
                <StyledStepText weight={0}>
                  {(supplierItem && supplierItem.name) ||
                    (stepComponent.priorSteps &&
                      stepComponent.priorSteps.name) ||
                    "-"}
                </StyledStepText>
              )}
              <ErrorMessage
                name={`sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].supplierItem`}
                render={(message) => (
                  <StyledErrorMessage>{message}</StyledErrorMessage>
                )}
              />
              <ErrorMessage
                name={`sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].priorSteps`}
                render={(message) => (
                  <StyledErrorMessage>{message}</StyledErrorMessage>
                )}
              />
            </Stack>
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${indexComponent}].name`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        </Stack>
        {/* error message while not on hover */}
        {!isHover && hasError(indexComponent, "description") && (
          <ErrorMessage
            name={`sections[${sectionIndex}].productionSteps[${indexComponent}].description`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        )}
      </StyledStepFirstBodyColumn>
      <StyledStepBodyCell align="center" width={widths[1]}>
        <StyledStepText weight={0}>
          {stepComponent.grossWeight
            ? roundNumber(stepComponent.grossWeight * 1000)
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[2]}>
        <StyledStepText weight={0}>
          {supplierItem && supplierItem.pricePerKg
            ? roundNumber(supplierItem.pricePerKg, 2) + " €"
            : "-"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[3]}>
        <StyledStepText weight={0}>
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
                name={stepComponentTransformationModeName}
                component={FormikEditableStepSelect}
                stepComponent={stepComponent}
                transformationModesOptions={transformationModesOptions}
                isClearable={true}
                endAdornment={
                  <IconButton
                    sx={{
                      display: stepComponent.transformationMode ? "" : "none"
                    }}
                    onClick={() =>
                      clearStepComponentTransformationMode(
                        stepComponentTransformationModeName
                      )
                    }
                  >
                    <ClearIcon />
                  </IconButton>
                }
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
                    stepComponentTransformationModeName,
                    transformationMode.transformationMode
                  );
                  stepComponent = recalculateCostValues(stepComponent);
                }}
              >
                {transformationModesOptions &&
                  transformationModesOptions.map((transformation, keyIndex) => (
                    <MenuItem
                      key={
                        indexStep +
                        "-" +
                        indexComponent +
                        "-" +
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
                name={`sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].transformationMode`}
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
      <StyledStepBodyCell align="center" width={widths[6]}>
        <StyledStepText weight={0}>
          {supplierItem && stepComponent.transformRate
            ? stepComponent.transformRate + " %"
            : "100 %"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[5]}>
        {supplierItem && isHover ? (
          <Stack>
            <Field
              component={FormikTextField}
              name={`sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].netWeight`}
              onClick={_stopPropagation}
              onChange={updateNetWeight}
              value={stepComponent.netWeight}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${indexStep}].stepComponents[${indexComponent}].netWeight`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : (
          <StyledStepText weight={0}>
            {stepComponent.netWeight
              ? roundNumber(stepComponent.netWeight, 2)
              : "-"}
          </StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* ------------ kitchenArea ------------ */}
      <StyledStepBodyCell align="center" width={widths[7]}>
        <StyledStepText>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[8]}>
        <StyledStepText>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="center" width={widths[9]}>
        <StyledStepText>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ stepDuration ------------ */}
      <StyledStepBodyCell align="center" width={widths[10]}>
        <StyledStepText>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      {/* ------------ stepDurationUnit ------------ */}
      <StyledStepBodyCell align="center" width={widths[11]}>
        <StyledStepText>{"-"}</StyledStepText>
      </StyledStepBodyCell>
      {/* -------- delete icon -------- */}
      <RemoveColumn
        type="stepComponent"
        isHover={isHover}
        onClick={(e) => _removeStepComponent(indexComponent, e)}
      />
    </Box>
  );
};

export default EditableStepComponent;
