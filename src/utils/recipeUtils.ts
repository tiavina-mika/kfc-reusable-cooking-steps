import { v4 as uuidv4 } from "uuid";
import { supplierItems } from "./supplierItems";
import { computeRecipeASP, roundNumber } from "./utils";

const SUGGESTED_PRICE = {
  RECIPE: {
    MAIN_COURSE: [
      { min: 0, max: 1.59, pvc: 6.9, hasColor: false },
      { min: 1.6, max: 1.79, pvc: 7.4, hasColor: false },
      { min: 1.8, max: 1.99, pvc: 7.9, hasColor: false },
      { min: 2, max: 2.14, pvc: 8.4, hasColor: false },
      { min: 2.15, max: 2.29, pvc: 9.4, hasColor: false },
      { min: 2.3, max: 2.49, pvc: 9.95, hasColor: false },
      { min: 2.5, max: 2.59, pvc: 10.4, hasColor: false },
      { min: 2.6, max: 2.69, pvc: 10.95, hasColor: false },
      { min: 2.7, max: 2.99, pvc: 11.4, hasColor: false },
      { min: 3, max: 999999999, pvc: 11.95, hasColor: true }
    ],
    STARTER: [
      { min: 0, max: 0.39, pvc: 2.5, hasColor: false },
      { min: 0.4, max: 0.49, pvc: 2.9, hasColor: false },
      { min: 0.5, max: 0.59, pvc: 3.2, hasColor: false },
      { min: 0.6, max: 0.69, pvc: 3.5, hasColor: false },
      { min: 0.7, max: 0.79, pvc: 3.7, hasColor: false },
      { min: 0.8, max: 0.89, pvc: 3.9, hasColor: false },
      { min: 0.9, max: 0.99, pvc: 4.5, hasColor: false },
      { min: 1, max: 999999999, pvc: 4.5, hasColor: true }
    ],
    DESSERT: [
      { min: 0, max: 0.39, pvc: 2.5, hasColor: false },
      { min: 0.4, max: 0.49, pvc: 2.9, hasColor: false },
      { min: 0.5, max: 0.59, pvc: 3.2, hasColor: false },
      { min: 0.6, max: 0.69, pvc: 3.5, hasColor: false },
      { min: 0.7, max: 0.79, pvc: 3.7, hasColor: false },
      { min: 0.8, max: 0.89, pvc: 3.9, hasColor: false },
      { min: 0.9, max: 999999999, pvc: 3.9, hasColor: true }
    ],
    KIDS: [
      { min: 0, max: 0.89, pvc: 3.9, hasColor: false },
      { min: 0.9, max: 0.99, pvc: 4.5, hasColor: false },
      { min: 1, max: 999999999, pvc: 4.9, hasColor: true }
    ],
    BREAKFAST: [
      { min: 0, max: 1.59, pvc: 6.9, hasColor: false },
      { min: 1.6, max: 1.79, pvc: 7.4, hasColor: false },
      { min: 1.8, max: 1.99, pvc: 7.9, hasColor: false },
      { min: 2, max: 2.14, pvc: 8.4, hasColor: false },
      { min: 2.15, max: 2.29, pvc: 9.4, hasColor: false },
      { min: 2.3, max: 2.49, pvc: 9.95, hasColor: false },
      { min: 2.5, max: 2.59, pvc: 10.4, hasColor: false },
      { min: 2.6, max: 2.69, pvc: 10.95, hasColor: false },
      { min: 2.7, max: 2.99, pvc: 11.4, hasColor: false },
      { min: 3, max: 999999999, pvc: 11.95, hasColor: true }
    ],
    MEAL_PREP: [
      { min: 0, max: 1.59, pvc: 6.9, hasColor: false },
      { min: 1.6, max: 1.79, pvc: 7.4, hasColor: false },
      { min: 1.8, max: 1.99, pvc: 7.9, hasColor: false },
      { min: 2, max: 2.14, pvc: 8.4, hasColor: false },
      { min: 2.15, max: 2.29, pvc: 9.4, hasColor: false },
      { min: 2.3, max: 2.49, pvc: 9.95, hasColor: false },
      { min: 2.5, max: 2.59, pvc: 10.4, hasColor: false },
      { min: 2.6, max: 2.69, pvc: 10.95, hasColor: false },
      { min: 2.7, max: 2.99, pvc: 11.4, hasColor: false },
      { min: 3, max: 999999999, pvc: 11.95, hasColor: true }
    ]
  },
  SUBCONTRACTORPRODUCT: {
    MAIN_COURSE: [
      { min: 0, max: 2.59, pvc: 6.9, hasColor: false },
      { min: 2.6, max: 2.79, pvc: 7.4, hasColor: false },
      { min: 2.8, max: 3.14, pvc: 7.9, hasColor: false },
      { min: 3.15, max: 3.29, pvc: 8.4, hasColor: false },
      { min: 3.3, max: 3.49, pvc: 8.9, hasColor: false },
      { min: 3.5, max: 3.59, pvc: 9.1, hasColor: false },
      { min: 3.6, max: 3.69, pvc: 9.9, hasColor: false },
      { min: 3.7, max: 3.99, pvc: 10.9, hasColor: false },
      { min: 4, max: 999999999, pvc: 10.9, hasColor: true }
    ],
    STARTER: [
      { min: 0, max: 1.39, pvc: 1.9 },
      { min: 1.4, max: 1.49, pvc: 2.1, hasColor: false },
      { min: 1.5, max: 1.59, pvc: 2.7, hasColor: false },
      { min: 1.6, max: 1.69, pvc: 2.9, hasColor: false },
      { min: 1.7, max: 1.79, pvc: 3.1, hasColor: false },
      { min: 1.8, max: 1.89, pvc: 3.5, hasColor: false },
      { min: 1.9, max: 1.99, pvc: 3.9, hasColor: false },
      { min: 2, max: 999999999, pvc: 3.9, hasColor: true }
    ],
    DESSERT: [
      { min: 0, max: 1.39, pvc: 1.9, hasColor: false },
      { min: 1.4, max: 1.49, pvc: 2.1, hasColor: false },
      { min: 1.5, max: 1.59, pvc: 2.7, hasColor: false },
      { min: 1.6, max: 1.69, pvc: 2.9, hasColor: false },
      { min: 1.7, max: 1.79, pvc: 3.1, hasColor: false },
      { min: 1.8, max: 1.89, pvc: 3.5, hasColor: false },
      { min: 1.9, max: 999999999, pvc: 3.5, hasColor: true }
    ],
    KIDS: [
      { min: 0, max: 1.89, pvc: 3.5, hasColor: false },
      { min: 1.9, max: 1.99, pvc: 3.9, hasColor: false },
      { min: 2, max: 999999999, pvc: 4.9, hasColor: true }
    ]
  }
};

export const STEP_DURATION_UNITS = ["kg / heure", "minute"];

export const recipeFields = [
  "name",
  "commercialName",
  "status",
  "type",
  "brands",
  "isActive",
  "internalTag",
  "season",
  "description",
  "tva",
  "dlc",
  "preparation",
  "specialInstruction",
  "heatingInstructions",
  "gesters",
  "portionPerPlate",
  "packaging",
  "subPackaging",
  "instructions",
  "sameInstructions",
  "difficulty",
  "sections",
  "sameDescriptions",
  "price",
  "ean",
  "news",
  "ingredientsComplexity",
  "reusablePackaging",
  "reusableSubPackaging",
  "defaultValues"
];

/**
 * @param {Parse.Object} parseObject
 * @param {Array|Set} names
 * @param dest (optional)
 */
export function getValues(parseObject, names, dest = {}) {
  names.forEach((name) => {
    const value = parseObject[name];
    if (value != null) {
      dest[name] = value;
    }
  });
  return dest;
}

export function getRecipePrice(recipe, brand) {
  const specificPrice =
    recipe.price && recipe.price.find((p) => brand === p.brand);

  return specificPrice && null !== specificPrice.value
    ? specificPrice.value
    : recipe.defaultValues
    ? recipe.defaultValues.price
    : 0;
}

export function getRecipeTva(recipe, brand) {
  const specificTva = recipe.tva && recipe.tva.find((p) => brand === p.brand);

  return specificTva && null !== specificTva.value
    ? specificTva.value
    : recipe.defaultValues
    ? recipe.defaultValues.tva
    : 0;
}

export function getPVC(type, productType, foodcost) {
  let result = { pvc: foodcost };

  if (
    SUGGESTED_PRICE.hasOwnProperty(type) &&
    SUGGESTED_PRICE[type].hasOwnProperty(productType)
  ) {
    const array = SUGGESTED_PRICE[type][productType];
    const found = array.find(
      (elem) => foodcost >= elem.min && foodcost <= elem.max
    );
    result = found ? found : { ...array[array.length - 1], hasColor: true };
  }

  return result;
}

export const getDefaultIngredients = () => {
  return {
    index: uuidv4(),
    grossWeight: 0,
    cookingMode: null,
    supplierItem: null,
    error: true
  };
};

export const getDefaultStepComponents = () => {
  return {
    index: uuidv4(),
    grossWeight: 0,
    cookingMode: null,
    supplierItem: null,
    error: true,
    complexity: null,
    cookingModeLabel: null,
    cost: null,
    netWeight: null,
    realCost: null,
    transformRate: null,
    transformationMode: null,
    emptyComponent: true
  };
};

export function getDefaultSteps() {
  return {
    index: uuidv4(),
    name: "",
    description: "",
    ingredients: [getDefaultIngredients()],
    stepComponents: [getDefaultStepComponents()],
    error: true,
    isEmpty: true
  };
}

export const getDefaultSection = () => {
  return {
    id: null,
    index: uuidv4(),
    name: "",
    generic: false,
    reusable: false,
    steps: [getDefaultSteps()],
    productionSteps: [getDefaultSteps()],
    error: true
  };
};

export function parseCookingModesToObject(cookingModes) {
  return cookingModes.map((cookingMode) => {
    return {
      cookingMode: {
        id: cookingMode.cookingMode.get
          ? cookingMode.cookingMode.id
          : cookingMode.cookingMode.objectId,
        name: cookingMode.cookingMode.name || ""
      },
      transformRate:
        cookingMode.transformRate !== null
          ? parseFloat(cookingMode.transformRate)
          : 100
    };
  });
}

export function parseSupplierItemToObject(ingredient) {
  const commercialName = ingredient.commercialName || null;
  const name =
    commercialName && commercialName.name
      ? commercialName.name
      : "Pas de nom commercial";
  const complexity = commercialName ? commercialName.complexity || 0 : 42;
  const id = commercialName ? commercialName.id : null;
  const allergens = (commercialName && commercialName.allergens
    ? commercialName.allergens
    : []
  ).map((elem) => {
    return { allergenId: elem.id, name: elem.name };
  });
  return {
    id: ingredient.id,
    index: uuidv4(),
    name: (ingredient.name && ingredient.name.toLowerCase()) || "",
    pricePerKg: ingredient.pricePerKg || null,
    cookingModes: ingredient.cookingModes
      ? parseCookingModesToObject(ingredient.cookingModes)
      : null,
    commercialName: name,
    commercialNameId: id,
    allergens: allergens,
    complexity: complexity
  };
}

export function parseIngredientsListToObject(
  ingredients = [],
  percent = false
) {
  return ingredients.map((ingredient) => {
    // --------- cooking mode --------- //
    let cookingMode = null;
    if (ingredient.cookingMode) {
      cookingMode = ingredient.cookingMode.get
        ? ingredient.cookingMode.id
        : ingredient.cookingMode.objectId;
    }

    // --------- complexity --------- //
    let complexity = 0;
    if (ingredient.supplierItem) {
      if (
        ingredient.supplierItem.get &&
        ingredient.supplierItem.get("commercialName")
      ) {
        complexity = ingredient.supplierItem
          .get("commercialName")
          .get("complexity");
      } else {
        const commercialName = ingredient.supplierItem.commercialName;
        complexity = commercialName.get
          ? commercialName.get("complexity")
          : commercialName.complexity;
      }
    }

    return {
      index: uuidv4(),
      grossWeight:
        (false !== percent
          ? (parseFloat(ingredient.grossWeight) * (percent as any)) / 100
          : parseFloat(ingredient.grossWeight)) || 0,
      cookingMode,
      supplierItem: ingredient.supplierItem
        ? parseSupplierItemToObject(ingredient.supplierItem)
        : null,
      complexity,
      error: ingredient.supplierItem
        ? ingredient.grossWeight && ingredient.grossWeight !== 0
          ? false
          : true
        : (percent as any) !== 0
    };
  });
}

export const parseStepsToObject = (steps, percent = false) => {
  return steps.map((step) => {
    return {
      name: step.name || "",
      index: step.index || uuidv4(),
      description: step.description || "",
      stepComponents: step.stepComponents
        ? parseIngredientsListToObject(step.stepComponents, percent)
        : [getDefaultIngredients()],
      ingredients: step.ingredients
        ? parseIngredientsListToObject(step.ingredients, percent)
        : [getDefaultIngredients()],
      error: step.description && step.description !== "" ? false : true,
      grossWeight:
        false !== percent
          ? step.grossWeight || 0
          : ((step.grossWeight || 0) * (percent as any)) / 100,
      preventGrossWeightChange: true
    };
  });
};

export const parseProductionStepToObject = (step, percent = false) => {
  return {
    objectId: step.objectId,
    name: step.name || "",
    index: step.index || uuidv4(),
    description: step.description || "",
    stepComponents: step.stepComponents
      ? parseIngredientsListToObject(step.stepComponents, percent)
      : [getDefaultIngredients()],
    error: step.description && step.description !== "" ? false : true,
    grossWeight:
      false !== percent
        ? step.grossWeight || 0
        : ((step.grossWeight || 0) * (percent as any)) / 100,
    preventGrossWeightChange: true,
    kitchenArea: step.kitchenArea || null,
    transformation: step.transformation || "",
    machineType: step.machineType || null,
    machineSetting: step.machineSetting || "",
    stepDuration: step.stepDuration || 0,
    stepDurationUnit: step.stepDurationUnit || ""
  };
};

export const parseProductionStepsToObject = (steps, percent = false) => {
  return steps.map((step) => {
    return parseProductionStepToObject(step, percent);
  });
};

export const parseReusableProductionStepToObject = (step, percent = false) => ({
  objectId: step.objectId,
  name: step.name || "",
  index: step.index || uuidv4(),
  isReusable: true,
  error: step.description && step.description !== "" ? false : true,
  productionSteps: step.productionSteps
    ? parseProductionStepsToObject(step.productionSteps, percent)
    : []
  // grossWeight:
  //   false !== percent
  //     ? step.grossWeight || 0
  //     : ((step.grossWeight || 0) * (percent as any)) / 100,
});

export const parseReusableProductionStepsToObject = (
  steps,
  percent = false
) => {
  return steps.map((step) => {
    return parseReusableProductionStepToObject(step, percent);
  });
};

export function computeIngredientData(ingredient) {
  let result: Record<string, any> = { netWeight: 0, cost: 0 };

  let cookingModes = null;
  let isSupplierItemObject = false;
  if (ingredient.supplierItem) {
    try {
      cookingModes = ingredient.supplierItem.get("cookingModes");
      isSupplierItemObject = true;
    } catch (error) {
      cookingModes = ingredient.supplierItem.cookingModes;
    }
  }

  if (ingredient.supplierItem && cookingModes) {
    const ingredientCookingModeId =
      typeof ingredient.cookingMode === "string"
        ? ingredient.cookingMode
        : (ingredient.cookingMode as any)?.objectId;
    const currentCookingMode = cookingModes.find(
      (cookingMode) =>
        cookingMode.cookingMode &&
        cookingMode.cookingMode.id === ingredientCookingModeId
    );

    const transformRate = currentCookingMode
      ? parseFloat(currentCookingMode.transformRate)
      : 0;

    const label =
      currentCookingMode && currentCookingMode.cookingMode
        ? currentCookingMode.cookingMode.name
        : "";

    const pricePerKg = isSupplierItemObject
      ? ingredient.supplierItem.pricePerKg
      : ingredient.supplierItem.pricePerKg;

    result = {
      grossWeight: ingredient.grossWeight
        ? roundNumber(parseFloat((ingredient as any).grossWeight), 5)
        : 0,
      netWeight:
        roundNumber(
          parseFloat(ingredient.grossWeight) * (transformRate / 100),
          5
        ) || 0,
      cost: pricePerKg * parseFloat(ingredient.grossWeight) || 0,

      realCost: pricePerKg * parseFloat(ingredient.grossWeight) || 0,
      transformRate: transformRate,
      cookingModeLabel: label
    };
  }

  return result;
}

// simulate a parse object
export const parseSectionToObject = (sections, percent = false) => {
  return sections.map((section) => {
    return {
      id: section.objectId,
      index: uuidv4(),
      name: section.name || "",
      generic: section.reusable !== null ? section.reusable : false,
      print:
        section.print !== null && section.print !== undefined
          ? section.print
          : true,
      reusable: false,
      steps: section.steps ? parseStepsToObject(section.steps, percent) : [],
      productionSteps: section.productionSteps
        ? parseProductionStepsToObject(section.productionSteps, percent)
        : [],
      error: section.name && section.name !== "" ? false : true,
      parentId: section.parentId ? section.parentId : null,
      parentPercent:
        section.parentPercent && section.parentPercent
          ? section.parentPercent
          : 0,
      grossWeight:
        false !== percent
          ? section.grossWeight || 0
          : ((section.grossWeight || 0) * (percent as any)) / 100,
      preventGrossWeightChange: true
    };
  });
};

export function computeRecipeData(recipe) {
  const {
    recipeCost,
    recipeRealCost,
    recipeNetWeight,
    recipeGrossWeight
  } = recipe.sections.reduce(
    (acc, section) => {
      acc.recipeCost += section.cost || 0;
      acc.recipeRealCost += section.realCost || 0;
      acc.recipeNetWeight += section.netWeight || 0;
      acc.recipeGrossWeight += section.grossWeight || 0;

      return acc;
    },
    {
      recipeCost: 0,
      recipeRealCost: 0,
      recipeNetWeight: 0,
      recipeGrossWeight: 0
    }
  );

  recipe.cost = recipeCost;
  recipe.netWeight = roundNumber(recipeNetWeight, 5);
  recipe.asp = computeRecipeASP(recipe);
  recipe.grossWeight = roundNumber(recipeGrossWeight, 5);

  const finalPrice = recipe.HTprice || recipe.HTPVC;
  recipe.fcpct = finalPrice
    ? roundNumber(
        ((roundNumber(recipeRealCost, 2) as any) / finalPrice) * 100,
        2
      )
    : null;
}

export const computeStepData = (step, ingredientsField = "ingredients") => {
  const { stepCost, stepRealCost, stepNetWeight, stepGrossWeight } = step[
    ingredientsField
  ].reduce(
    (acc, ingredient) => {
      acc.stepCost += ingredient.cost || 0;
      acc.stepRealCost += ingredient.realCost || 0;
      acc.stepNetWeight += ingredient.netWeight || 0;
      acc.stepGrossWeight += ingredient.grossWeight || 0;

      return acc;
    },
    { stepCost: 0, stepRealCost: 0, stepNetWeight: 0, stepGrossWeight: 0 }
  );

  step.netWeight = roundNumber(stepNetWeight, 5);
  step.grossWeight = roundNumber(stepGrossWeight, 5);
  step.cost = stepCost;
  step.realCost = stepRealCost;
  step.inputWeight = roundNumber(stepGrossWeight * 1000, 5);
  step.outputWeight = roundNumber(stepNetWeight * 1000, 5);
};

export function computeSectionData(section, stepsField = "steps") {
  const {
    sectionCost,
    sectionRealCost,
    sectionNetWeight,
    sectionGrossWeight
  } = section[stepsField].reduce(
    (acc, step) => {
      acc.sectionCost += step.cost || 0;
      acc.sectionRealCost += step.realCost || 0;
      acc.sectionNetWeight += step.netWeight || 0;
      acc.sectionGrossWeight += step.grossWeight || 0;

      return acc;
    },
    {
      sectionCost: 0,
      sectionRealCost: 0,
      sectionNetWeight: 0,
      sectionGrossWeight: 0
    }
  );

  section.netWeight = roundNumber(sectionNetWeight, 5);
  section.grossWeight = roundNumber(sectionGrossWeight, 5);
  section.cost = sectionCost;
  section.realCost = sectionRealCost;
  section.inputWeight = roundNumber(sectionGrossWeight * 1000, 5);
  section.outputWeight = roundNumber(sectionNetWeight * 1000, 5);
}

/**
 * @TODO 3 nested loops isn't a good design, check for better possibilities
 */
function computeDisplayData(
  recipe,
  isRecipe = true,
  stepsField = "steps", // "steps" (arr obj) or "productionSteps" (arr pointers)
  stepIngredientField = "ingredients"
) {
  for (const section of recipe.sections) {
    for (const step of section[stepsField]) {
      for (const ingredient of step[stepIngredientField]) {
        const computedIngredientData = computeIngredientData(ingredient);
        ingredient.netWeight = computedIngredientData.netWeight;
        ingredient.cost = computedIngredientData.cost;
        ingredient.realCost = (computedIngredientData as any).realCost;
        ingredient.transformRate = (computedIngredientData as any).transformRate;
        ingredient.cookingModeLabel = (computedIngredientData as any).cookingModeLabel;

        const currentCookingMode =
          ingredient.supplierItem &&
          ingredient.supplierItem.cookingModes.find(
            (cookingMode) =>
              cookingMode.cookingMode.id === ingredient.cookingMode
          );
        ingredient.transformRate = currentCookingMode
          ? parseFloat(currentCookingMode.transformRate)
          : 0;
      }

      computeStepData(step, stepIngredientField);
    }

    computeSectionData(section, stepsField);
  }

  if (isRecipe) computeRecipeData(recipe);
}

export const getRecipeSectionsFormInitialValues = (
  recipe,
  isProductionSteps = false
) => {
  const values: Record<string, any> = {};

  if (!recipe || typeof recipe !== "object") {
    values.id = null;
    values.sections = [getDefaultSection()];
  } else {
    const recipeObject: Record<string, any> = getValues(recipe, recipeFields);
    const TTCPrice = getRecipePrice(recipe, "FOODCHERI");
    const tva = getRecipeTva(recipe, "FOODCHERI");
    const pvc = getPVC("RECIPE", recipeObject.type, recipe.foodcost).pvc;

    values.id = recipe.id;
    values.sections =
      recipeObject.sections && recipeObject.sections.length
        ? parseSectionToObject(recipeObject.sections, false)
        : [getDefaultSection()];
    values.type = recipeObject.type;
    values.HTprice =
      tva && TTCPrice && TTCPrice !== 0
        ? TTCPrice - TTCPrice * (parseFloat(tva) / 100)
        : null;
    values.HTPVC =
      tva && (!TTCPrice || TTCPrice === 0)
        ? pvc - pvc * (parseFloat(tva) / 100)
        : null;
  }

  if (isProductionSteps) {
    computeDisplayData(values, true, "productionSteps", "stepComponents");
  } else {
    computeDisplayData(values);
  }

  return values;
};

export const getReusableFormInitialValues = (step: Record<string, any>) => {
  const productionSteps = step
    ? parseProductionStepsToObject(step.productionSteps)
    : [getDefaultSteps()];

  const values: Record<string, any> = {
    productionSteps,
    name: step ? step.name : ""
  };

  return values;
};

/**
 * Here we assume that a computed data can change only if numbered values changes in an ingredient.
 * If ingredientIndex is null, it means it's a new or a removed ingredient
 */
export const computeStepsRecipeOnFieldChange = (
  recipe,
  sectionIndex = null,
  stepIndex = null,
  stepComponentIndex = null
) => {
  if (sectionIndex !== null) {
    // to avoid 0
    const section = recipe.sections[sectionIndex];

    if (stepIndex !== null) {
      const step = section.steps[stepIndex];

      if (stepComponentIndex !== null) {
        const stepComponent = step.ingredients[stepComponentIndex];

        if (stepComponent) {
          const {
            cost,
            realCost,
            grossWeight,
            netWeight,
            transformRate,
            cookingModeLabel
          }: Record<string, any> = computeIngredientData(stepComponent);
          stepComponent.grossWeight = grossWeight;
          stepComponent.netWeight = netWeight;
          stepComponent.cost = cost;
          stepComponent.realCost = realCost;
          stepComponent.transformRate = transformRate;
          stepComponent.cookingModeLabel = cookingModeLabel;
        }
      }

      computeStepData(step);
    }

    computeSectionData(section);
  }

  computeRecipeData(recipe);
};

/**
 * Here we assume that a computed data can change only if numbered values changes in an ingredient.
 * If ingredientIndex is null, it means it's a new or a removed ingredient
 */
export const computeProductionStepsRecipeOnFieldChange = (
  recipe,
  sectionIndex = null,
  stepIndex = null,
  stepComponentIndex = null
) => {
  if (sectionIndex !== null) {
    // to avoid 0
    const section = recipe.sections[sectionIndex];

    if (stepIndex !== null) {
      const step = section.productionSteps[stepIndex];

      if (stepComponentIndex !== null) {
        const stepComponent = step.stepComponents[stepComponentIndex];

        if (stepComponent) {
          const {
            cost,
            realCost,
            grossWeight,
            netWeight,
            transformRate,
            cookingModeLabel
          }: Record<string, any> = computeIngredientData(stepComponent);
          stepComponent.grossWeight = grossWeight;
          stepComponent.netWeight = netWeight;
          stepComponent.cost = cost;
          stepComponent.realCost = realCost;
          stepComponent.transformRate = transformRate;
          stepComponent.cookingModeLabel = cookingModeLabel;
        }
      }

      computeStepData(step, "stepComponents");
    }

    computeSectionData(section, "productionSteps");
  }

  computeRecipeData(recipe);
};

export const computeReusableProductionStepsOnFieldChange = (
  reusableStep,
  stepIndex = null,
  stepComponentIndex = null
) => {
  if (stepIndex !== null) {
    const step = reusableStep.productionSteps[stepIndex];

    if (stepComponentIndex !== null) {
      const stepComponent = step.stepComponents[stepComponentIndex];

      if (stepComponent) {
        const {
          cost,
          realCost,
          grossWeight,
          netWeight,
          transformRate,
          cookingModeLabel
        }: Record<string, any> = computeIngredientData(stepComponent);
        stepComponent.grossWeight = grossWeight;
        stepComponent.netWeight = netWeight;
        stepComponent.cost = cost;
        stepComponent.realCost = realCost;
        stepComponent.transformRate = transformRate;
        stepComponent.cookingModeLabel = cookingModeLabel;
      }
    }

    computeStepData(step, "stepComponents");
  }
};

export const recalculateCostValues = (stepComponent: Record<string, any>) => {
  stepComponent.grossWeight =
    stepComponent.netWeight /
    ((stepComponent.transformRate ? stepComponent.transformRate : 100) / 100) /
    1000;
  stepComponent.realCost = roundNumber(
    stepComponent.grossWeight * stepComponent.supplierItem.pricePerKg,
    3
  );

  return stepComponent;
};

export function getEmptyStepComponent() {
  return {
    complexity: null,
    cookingMode: null,
    cookingModeLabel: null,
    cost: null,
    error: false,
    grossWeight: null,
    index: 0,
    netWeight: null,
    realCost: null,
    supplierItem: null,
    transformRate: null,
    transformationMode: null,
    emptyComponent: true
  };
}

export function resetStepComponent(stepComponent) {
  stepComponent.grossWeight = 0;
  stepComponent.cookingMode = null;
  stepComponent.cookingModeLabel = null;
  stepComponent.cost = null;
  stepComponent.netWeight = null;
  stepComponent.realCost = null;
  stepComponent.supplierItem = null;
  stepComponent.priorSteps = null;
  stepComponent.transformRate = 100;
  stepComponent.transformationMode = null;

  return stepComponent;
}

export const searchSupplierItemsAutocomplete = (search: string) => {
  const newSupplierItems = supplierItems.filter((supplierItem) =>
    supplierItem.name.includes(search)
  );
  return newSupplierItems;
};
