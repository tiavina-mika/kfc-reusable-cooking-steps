import React, { FC, useCallback, useEffect } from "react";
import { computeReusableProductionStepsOnFieldChange } from "../../../utils/recipeUtils";

import { IHoveredRow } from "../../productionSteps/sections/Sections";
import Steps from "../../productionSteps/steps/Steps";

type Props = {
  machineTypes: Record<string, any>[];
  kitchenAreas: Record<string, any>[];
  errors: Record<string, any>;
  formValues: Record<string, any>;
  setFieldValue: any;
  setValues: any;
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
};
const EditableReusableSteps: FC<Props> = ({
  formValues,
  errors,
  setFieldValue,
  setValues,
  onRowHover,
  onRowBlur,
  hoveredRow,
  onFieldFocus,
  onFieldBlur,
  onKeyUp,
  kitchenAreas,
  machineTypes
}) => {
  useEffect(() => {}, []);
  const computeReusableStepsFormValues = useCallback(
    (steps: Record<string, any>) => {
      const newFormValues = { ...formValues };

      steps.forEach((step, stepIndex) => {
        step.stepComponents.forEach((_, ingredientIndex) => {
          computeReusableProductionStepsOnFieldChange(
            newFormValues,
            stepIndex,
            ingredientIndex
          );
        });
      });

      newFormValues.productionSteps = steps;
      setValues(newFormValues);
    },
    [formValues, setValues]
  );

  const _hasError = (index: number, field: string) => {
    return errors.productionSteps?.[index]?.[field];
  };

  return (
    <Steps
      steps={formValues?.productionSteps || []}
      isEdition
      hoveredRow={hoveredRow}
      onFieldFocus={onFieldFocus}
      onFieldBlur={onFieldBlur}
      onKeyUp={onKeyUp}
      onRowHover={onRowHover}
      onRowBlur={onRowBlur}
      errors={errors}
      machineTypes={machineTypes}
      kitchenAreas={kitchenAreas}
      setFieldValue={setFieldValue}
      hasError={_hasError}
      computeReusableStepsFormValues={computeReusableStepsFormValues}
      isReusable
      // onKeyDown={(e) => _onKeyDown(e, section)}
    />
  );
};

export default EditableReusableSteps;
