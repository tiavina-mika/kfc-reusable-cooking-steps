import { computeIngredientData } from "./recipeUtils";
import { roundNumber } from "./utils";

export const getRecipeFoodcost = (sections) => {
  let count = 0;

  for (const section of sections) {
    count += section.cost;
  }

  return count;
};

export const getSupplierItemsFromSections = (
  sections,
  stepsField = "steps",
  ingredientsField = "ingredients"
) => {
  const supplierItemsList = [];

  for (const section of sections) {
    const steps = section[stepsField] || [];
    for (const step of steps) {
      const ingredients = step[ingredientsField] || [];
      for (const ingredient of ingredients) {
        const currentIngredient = ingredient;
        if (
          currentIngredient.supplierItem &&
          !supplierItemsList.includes(currentIngredient.supplierItem.id)
        ) {
          supplierItemsList.push(currentIngredient.supplierItem);
          // supplierItemsList.push(currentIngredient.supplierItem.id)
        }
      }
    }
  }

  return supplierItemsList;
};

export const computeIngredientsPercentage = (
  recipeNetWeight,
  sections,
  supplierItems,
  stepsField = "steps",
  ingredientsField = "ingredients"
) => {
  const ingredientsPercentage = [];
  const ingredientsWeight = supplierItems.map((supplierItem) => ({
    id: supplierItem.id,
    weight: 0,
    supplierItem
  }));

  for (const section of sections) {
    for (const step of section[stepsField]) {
      for (const ingredient of step[ingredientsField]) {
        const ingredientData = computeIngredientData(ingredient);
        const currentIngredientWeight = ingredientsWeight.find(
          (el) => el.id === ingredient.supplierItem?.id
        );
        if (currentIngredientWeight) {
          currentIngredientWeight.weight += ingredientData.netWeight;
        }
      }
    }
  }

  for (const ingredient of ingredientsWeight) {
    const percentage = roundNumber(
      ((ingredient.weight * 1000) / (recipeNetWeight * 1000)) * 100,
      2
    );

    ingredientsPercentage.push({
      supplierItem: ingredient.supplierItem,
      percentage: percentage
    });
  }

  return ingredientsPercentage;
};

export const updateRecipeSections = (
  values,
  recipe,
  isProductionSteps = true
) => {
  if (!recipe || !values.sections) {
    return;
  }
  const foodcost = getRecipeFoodcost(values.sections);

  const netWeight = values.netWeight;

  const supplierItems = isProductionSteps
    ? getSupplierItemsFromSections(
        values.sections,
        "productionSteps",
        "stepComponents"
      )
    : getSupplierItemsFromSections(values.sections);

  const ingredients = isProductionSteps
    ? computeIngredientsPercentage(
        values.netWeight,
        values.sections,
        supplierItems,
        "productionSteps",
        "stepComponents"
      )
    : computeIngredientsPercentage(
        values.netWeight,
        values.sections,
        supplierItems
      );

  return {
    foodcost,
    netWeight,
    ingredients
  };
};
