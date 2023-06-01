import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import ProductionStepsTable from "./components/productionSteps/ProductionStepsTable";

import ProductionStepsTableHead from "./components/productionSteps/ProductionStepsTableHead";
import {
  computeProductionStepsRecipeOnFieldChange,
  getReusableFormInitialValues
} from "./utils/recipeUtils";
import { cloneDeep } from "lodash";
import ReusableSteps from "./components/reusableSteps/ReusableSteps";
import { machineTypes } from "./utils/data/machineTypes";
import { kitchenAreas } from "./utils/data/kitchenAreas";
import { steps } from "./utils/data/step";
import { ReusableProductionStepSchema } from "./utils/validators";
import ReusableStepParent from "./components/reusableSteps/ReusableStepParent";
import Steps from "./components/productionSteps/steps/Steps";
import ReusableStepsEdition from "./components/reusableSteps/ReusableStepsEdition";
const headers = [
  { label: "Étape / Article" },
  { label: "Poids en entrée (g)" },
  { label: "Prix au kg (€)" },
  { label: "Foodcost (€)" },
  { label: "Transformation" },
  { label: "Rendement (%)" },
  { label: "Poids en sortie (g)" },
  { label: "Atelier" },
  { label: "Machine" },
  { label: "Paramétrage machine" },
  { label: "Durée de l'étape (valeur)" },
  { label: "Durée de l'étape (unité)" },
  { label: "" }
];

type Props = {
  onSave?: (values: Record<string, any>) => void;
};
const AddReusableStep: FC<Props> = ({ onSave }) => {
  const formRef = useRef();
  const [initialValues, setInitialValues] = useState(null);
  /*
   * this will not be changed,
   * unlike the initial values that changed every input of the form change
   */
  const [defaultValues, setDefaultValues] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [fieldFocused, setFieldFocused] = useState<boolean>(false);

  useEffect(() => {
    const formValues = getReusableFormInitialValues();
    setInitialValues(formValues);
    setDefaultValues(cloneDeep(formValues));
  }, []);

  const onRowBlur = () => {
    if (fieldFocused) return;
    setHoveredRow(null);
  };

  const onRowHover = (component, index) => {
    if (fieldFocused) return;
    setHoveredRow({ component, index });
  };

  const onClearFocus = () => setFieldFocused(false);

  const onFieldFocus = () => setFieldFocused(true);

  const onFieldBlur = (event, setFieldTouched) => {
    setFieldFocused(false);
    setFieldTouched(event.target.name);
  };

  const onKeyUp = (event, setFieldTouched) => {
    if (!setFieldTouched) return;
    setFieldTouched(event.target.name);
  };

  const handleSubmit = () => {
    if (!formRef.current) return;
    (formRef.current as any).handleSubmit();
  };

  const handleCancel = () => {
    setInitialValues(defaultValues);
  };

  const _onSubmit = (values) => {
    onSave(values);
    // onSave(cloneDeep(values), recipe, "6" === recipe.status).then(onStopEdit)
  };

  // const computeReusableStepsFormValues = useCallback(
  //   (steps: Record<string, any>, formValues: Record<string, any>, setValues: any) => {
  //     const newFormValues = { ...formValues };

  //     steps.forEach((step, stepIndex) => {
  //       step.stepComponents.forEach((_, ingredientIndex) => {
  //         computeProductionStepsRecipeOnFieldChange(
  //           newFormValues,
  //           // sectionIndex,
  //           stepIndex,
  //           ingredientIndex
  //         );
  //       });
  //     });

  //     newFormValues.productionSteps = steps;
  //     setValues(newFormValues);
  //   },
  //   [sections, formValues, setValues]
  // );

  return (
    <Box className="flexColumn">
      <Box p={1.2} className="flexRow justifyEnd flexEnd flex1 stretchSelf">
        <Stack direction="row" spacing={5}>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            Enregistrer
          </Button>
        </Stack>
      </Box>
      {/* table */}
      <ProductionStepsTable>
        {/* table head */}
        <ProductionStepsTableHead
          headers={headers}
          hasAnyHoveredRow={!!hoveredRow}
        />
        <Box className="flexColumn">
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={ReusableProductionStepSchema}
            onSubmit={_onSubmit}
            validateOnChange={false}
            enableReinitialize
          >
            {({
              values,
              errors,
              setFieldValue,
              setFieldError,
              setFieldTouched,
              submitForm,
              validateForm,
              setValues
            }) => {
              return (
                <>
                  <ReusableStepParent
                    step={values}
                    hoveredRow={hoveredRow}
                    onRowHover={onRowHover}
                    onRowBlur={onRowBlur}
                  />
                  {/* <ReusableSteps
                    steps={values?.productionSteps || []}
                    formValues={values}
                    isEdition
                    setFieldValue={setFieldValue}
                    hoveredRow={hoveredRow}
                    onFieldFocus={onFieldFocus}
                    onFieldBlur={(e) => onFieldBlur(e, setFieldTouched)}
                    onKeyUp={(e) => onKeyUp(e, setFieldTouched)}
                    onRowHover={onRowHover}
                    onRowBlur={onRowBlur}
                    errors={errors}
                    machineTypes={machineTypes}
                    kitchenAreas={kitchenAreas}
                    allSteps={steps}
                    onClearFocus={onClearFocus}
                    setValues={setValues}
                    // computeStepsFormValues={computeStepsFormValues}
                    // onKeyDown={(e) => _onKeyDown(e, section)}
                  /> */}
                  <ReusableStepsEdition
                    hoveredRow={hoveredRow}
                    onFieldFocus={onFieldFocus}
                    onFieldBlur={(e) => onFieldBlur(e, setFieldTouched)}
                    onKeyUp={(e) => onKeyUp(e, setFieldTouched)}
                    onRowHover={onRowHover}
                    onRowBlur={onRowBlur}
                    errors={errors}
                    machineTypes={machineTypes}
                    kitchenAreas={kitchenAreas}
                    setFieldValue={setFieldValue}
                    // hasError={(index, field) => !!errors.productionSteps?.[index]?.[field]}
                    formValues={values}
                    setValues={setValues}
                    // computeStepsFormValues={computeStepsFormValues}
                    // onKeyDown={(e) => _onKeyDown(e, section)}
                  />
                </>
              );
            }}
          </Formik>
        </Box>
      </ProductionStepsTable>
    </Box>
  );
};

export default AddReusableStep;
