import React, { FC, useCallback } from "react";

import ReusableStepParent from "./form/ReusableStepParent";
import { IHoveredRow } from "../productionSteps/sections/Sections";
import { computeReusableProductionStepsOnFieldChange } from "../../utils/recipeUtils";
import Steps from "../productionSteps/steps/Steps";

type Props = {
  stepValues?: Record<string, any>;
  onRowBlur: () => void;
  onRowHover?: (
    component: string,
    index: number,
    parendIndex?: number | null,
    stepComponentIndex?: number | null,
    indexSubComponent?: number | null
  ) => void;
  onFieldFocus: () => void;
  onFieldBlur: (event: Record<string, any>, setFieldTouched: any) => void;
  onKeyUp: (event: Record<string, any>, setFieldTouched: any) => void;
  hoveredRow: IHoveredRow;
  errors: Record<string, any>;
  setFieldValue: any;
  setValues?: any;
  machineTypes?: Record<string, any>[];
  kitchenAreas?: Record<string, any>[];
  parentStepIndex?: number;
};
const ReusableStepFormRow: FC<Props> = ({
  onRowHover,
  onRowBlur,
  stepValues,
  onFieldFocus,
  onKeyUp,
  onFieldBlur,
  hoveredRow,
  errors,
  setFieldValue,
  setValues,
  machineTypes,
  kitchenAreas,
  parentStepIndex
}) => {
  const computeReusableStepsFormValues = useCallback(
    (steps: Record<string, any>) => {
      const newFormValues = { ...stepValues };

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
    [stepValues, setValues]
  );

  const _hasError = (index: number, field: string) => {
    return errors.productionSteps?.[index]?.[field];
  };

  return (
    <>
      <ReusableStepParent
        step={stepValues}
        hoveredRow={hoveredRow}
        onRowHover={onRowHover}
        onRowBlur={onRowBlur}
      />
      <Steps
        steps={stepValues?.productionSteps || []}
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
        fromRecipe={false}
        parentStepIndex={parentStepIndex}
      />
    </>
  );
};

export default ReusableStepFormRow;
