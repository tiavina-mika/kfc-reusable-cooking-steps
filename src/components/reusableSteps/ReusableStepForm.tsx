import React, { FC, useEffect, useRef, useState } from "react";

import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import { cloneDeep } from "lodash";

import ProductionStepsTable from "../productionSteps/ProductionStepsTable";
import ProductionStepsTableHead from "../productionSteps/ProductionStepsTableHead";
import { getReusableFormInitialValues } from "../../utils/recipeUtils";
import { machineTypes } from "../../utils/data/machineTypes";
import { kitchenAreas } from "../../utils/data/kitchenAreas";
import { ReusableProductionStepSchema } from "../../utils/validators";
import ReusableStepFormRow from "./ReusableStepFormRow";

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
  onCancel: () => void;
  step?: Record<string, any>;
};
const ReusableStepForm: FC<Props> = ({ step, onSave, onCancel }) => {
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
    const formValues = getReusableFormInitialValues(step);
    setInitialValues(formValues);
    setDefaultValues(cloneDeep(formValues));
  }, [step]);

  const onRowBlur = () => {
    if (fieldFocused) return;
    setHoveredRow(null);
  };

  /**
   * ComponentIndex is used for productionSteps > stepComponents
   * PriorComponentIndex is used for productionSteps > stepComponents > priorSteps
   */
  const onRowHover = (
    component,
    index,
    parentIndex = null,
    componentIndex = null,
    priorComponentIndex = null
  ) => {
    if (fieldFocused) return;
    setHoveredRow({
      component,
      index,
      parentIndex,
      componentIndex,
      priorComponentIndex
    });
  };

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
    onCancel();
  };

  const _onSubmit = (values) => {
    console.log("values", values);
    onSave(values);
  };

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
                <ReusableStepFormRow
                  onRowHover={onRowHover}
                  onRowBlur={onRowBlur}
                  hoveredRow={hoveredRow}
                  onFieldFocus={onFieldFocus}
                  onFieldBlur={(e) => onFieldBlur(e, setFieldTouched)}
                  onKeyUp={(e) => onKeyUp(e, setFieldTouched)}
                  errors={errors}
                  machineTypes={machineTypes}
                  kitchenAreas={kitchenAreas}
                  setFieldValue={setFieldValue}
                  stepValues={values}
                  setValues={setValues}
                />
              );
            }}
          </Formik>
        </Box>
      </ProductionStepsTable>
    </Box>
  );
};

export default ReusableStepForm;
