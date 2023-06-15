import React, { FC } from "react";

import ReusableStepParent from "./form/ReusableStepParent";
import EditableReusableSteps from "./form/EditableReusableSteps";
import { IHoveredRow } from "../productionSteps/sections/Sections";

type Props = {
  stepValues?: Record<string, any>;
  onRowBlur: () => void;
  onRowHover: (component, index) => void;
  onFieldFocus: () => void;
  onFieldBlur: (event: Record<string, any>, setFieldTouched: any) => void;
  onKeyUp: (event: Record<string, any>, setFieldTouched: any) => void;
  hoveredRow: IHoveredRow;
  errors: Record<string, any>;
  setFieldValue: any;
  setValues?: any;
  machineTypes?: Record<string, any>[];
  kitchenAreas?: Record<string, any>[];
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
  kitchenAreas
}) => {
  return (
    <>
      <ReusableStepParent
        step={stepValues}
        hoveredRow={hoveredRow}
        onRowHover={onRowHover}
        onRowBlur={onRowBlur}
      />
      <EditableReusableSteps
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
        formValues={stepValues}
        setValues={setValues}
        // computeStepsFormValues={computeStepsFormValues}
      />
    </>
  );
};

export default ReusableStepFormRow;
