import React, { FC, useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import { Formik } from "formik";
import ProductionStepsTable from "./components/productionSteps/ProductionStepsTable";

import ProductionStepsTableHead from "./components/productionSteps/ProductionStepsTableHead";
import { getReusableFormInitialValues } from "./utils/recipeUtils";
import { cloneDeep } from "lodash";
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
  // const [fieldFocused, setFieldFocused] = useState<boolean>(false);

  useEffect(() => {
    const formValues = getReusableFormInitialValues();
    setInitialValues(formValues);
    setDefaultValues(cloneDeep(formValues));
  }, []);

  // const handleSubmit = () => {
  //   if (!formRef.current) return;
  //   (formRef.current as any).handleSubmit();
  // };

  // const handleCancel = () => {
  //   setInitialValues(defaultValues);
  //   onCancel?.();
  // };

  const _onSubmit = (values) => {
    onSave(values);
    // onSave(cloneDeep(values), recipe, "6" === recipe.status).then(onStopEdit)
  };

  return (
    <div>
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
            // validationSchema={RecipeProductionStepsSchema}
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
              return <h1>coool</h1>;
            }}
          </Formik>
        </Box>
      </ProductionStepsTable>
    </div>
  );
};

export default AddReusableStep;
