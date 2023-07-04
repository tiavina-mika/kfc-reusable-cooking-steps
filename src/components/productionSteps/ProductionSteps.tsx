import React, { FC, useEffect, useRef, useState } from "react";

import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import { cloneDeep } from "lodash";

import ProductionStepsTableHead from "./ProductionStepsTableHead";
import Sections from "./sections/Sections";
import ProductionStepsTable from "./ProductionStepsTable";
import { getRecipeSectionsFormInitialValues } from "../../utils/recipeUtils";
import { RecipeProductionStepsSchema } from "../../utils/validators";
import ProductionStepsContainer from "./ProductionStepsContainer";
import { machineTypes } from "../../utils/data/machineTypes";
import { kitchenAreas } from "../../utils/data/kitchenAreas";

const headers = [
  { label: "Section / Étape / Article" },
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
  toggleEditForm?: () => void;
  onCancel?: () => void;
  onSave?: (values: Record<string, any>) => void;
  isEdition?: boolean;
  recipe?: Record<string, any>;
  genericSections?: Record<string, any>[];
};
const ProductionSteps: FC<Props> = ({
  toggleEditForm,
  onCancel,
  onSave,
  recipe,
  genericSections,
  isEdition = false
}) => {
  const formRef = useRef();
  const [initialValues, setInitialValues] = useState(null);
  /*
   * this will not be changed,
   * unlike the initial values that changed every input of the form change
   */
  const [defaultValues, setDefaultValues] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [fieldFocused, setFieldFocused] = useState<boolean>(false);
  const [deleteHover, setDeleteHover] = useState<Record<string, any> | null>(
    null
  );

  useEffect(() => {
    const formValues = getRecipeSectionsFormInitialValues(recipe, true);
    setInitialValues(formValues);
    setDefaultValues(cloneDeep(formValues));
  }, [recipe]);

  const _onRowBlur = () => {
    if (fieldFocused) return;
    setHoveredRow(null);
  };

  /**
   * ComponentIndex is used for productionSteps > stepComponents
   * PriorComponentIndex is used for productionSteps > stepComponents > priorSteps
   */
  const _onRowHover = (
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

  const _onClearFocus = () => setFieldFocused(false);

  const _onFieldFocus = () => setFieldFocused(true);

  const _onFieldBlur = (event, setFieldTouched) => {
    setFieldFocused(false);
    setFieldTouched(event.target.name);
  };

  const _onKeyUp = (event, setFieldTouched) => {
    if (!setFieldTouched) return;
    setFieldTouched(event.target.name);
  };

  const _onDeleteHover = (
    component: string,
    index: number,
    parentIndex = null
  ) => {
    setDeleteHover({ component, index, parentIndex });
  };

  const _onDeleteBlur = () => setDeleteHover(null);

  const handleSubmit = () => {
    if (!formRef.current) return;
    (formRef.current as any).handleSubmit();
  };

  const handleCancel = () => {
    setInitialValues(defaultValues);
    onCancel?.();
  };

  const _onSubmit = (values) => {
    onSave(values);
    // onSave(cloneDeep(values), recipe, "6" === recipe.status).then(onStopEdit)
  };

  return (
    <ProductionStepsContainer
      title={recipe?.commercialName}
      onSave={handleSubmit}
      onCancel={handleCancel}
      withTitle={isEdition}
    >
      <div>
        {/* buttons */}
        {!isEdition && (
          <Box
            className="flexRow justifyEnd"
            sx={{ py: 30, pr: 40, position: "fixed", top: 60, right: 0 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={toggleEditForm}
            >
              Éditer
            </Button>
          </Box>
        )}
        {/* table */}
        <ProductionStepsTable sx={{ mt: isEdition ? 0 : 10 }}>
          {/* table head */}
          <ProductionStepsTableHead
            headers={headers}
            hasAnyHoveredRow={!!hoveredRow}
          />
          <Box className="flexColumn">
            <Formik
              innerRef={formRef}
              initialValues={initialValues}
              validationSchema={RecipeProductionStepsSchema}
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
                  <Sections
                    sections={values?.sections || []}
                    isEdition={isEdition}
                    onRowBlur={_onRowBlur}
                    onRowHover={_onRowHover}
                    hoveredRow={hoveredRow}
                    genericSections={genericSections}
                    onClearFocus={_onClearFocus}
                    onFieldFocus={_onFieldFocus}
                    onFieldBlur={(e) => _onFieldBlur(e, setFieldTouched)}
                    onKeyUp={(e) => _onKeyUp(e, setFieldTouched)}
                    onDeleteHover={_onDeleteHover}
                    deleteHover={deleteHover}
                    setFieldValue={setFieldValue}
                    onDeleteBlur={_onDeleteBlur}
                    errors={errors}
                    formValues={values}
                    setValues={setValues}
                    machineTypes={machineTypes}
                    kitchenAreas={kitchenAreas}
                  />
                );
              }}
            </Formik>
          </Box>
        </ProductionStepsTable>
      </div>
    </ProductionStepsContainer>
  );
};

export default ProductionSteps;
