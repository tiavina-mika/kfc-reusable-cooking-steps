import { v4 as uuidv4 } from "uuid";
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

export const getDefaultSteps = () => {
  return {
    index: uuidv4(),
    name: "",
    description: "",
    ingredients: [getDefaultIngredients()],
    error: true
  };
};

export const getDefaultSection = () => {
  return {
    id: null,
    index: uuidv4(),
    name: "",
    generic: false,
    reusable: false,
    steps: [getDefaultSteps()],
    error: true
  };
};

export function parseCookingModesToObject(cookingModes) {
  return cookingModes.map((cookingMode) => {
    return {
      cookingMode: {
        id: cookingMode.cookingMode.id,
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

export const parseIngredientsListToObject = (ingredients, percent = false) => {
  return ingredients.map((ingredient) => {
    return {
      index: uuidv4(),
      grossWeight:
        (false !== percent
          ? (parseFloat(ingredient.grossWeight) * (percent as any)) / 100
          : parseFloat(ingredient.grossWeight)) || 0,
      cookingMode:
        (ingredient.cookingMode && ingredient.cookingMode.id) || null,
      supplierItem: ingredient.supplierItem
        ? parseSupplierItemToObject(ingredient.supplierItem)
        : null,
      complexity:
        ingredient.supplierItem && ingredient.supplierItem.commercialName
          ? ingredient.supplierItem.commercialName.complexity
          : 0,
      error: ingredient.supplierItem
        ? ingredient.grossWeight && ingredient.grossWeight !== 0
          ? false
          : true
        : (percent as any) !== 0
    };
  });
};

export const parseStepsToObject = (steps, percent = false) => {
  return steps.map((step) => {
    return {
      name: step.name || "",
      index: step.index || uuidv4(),
      description: step.description || "",
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

export function computeIngredientData(ingredient) {
  let result = { netWeight: 0, cost: 0 };

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

export function computeStepData(step) {
  const {
    stepCost,
    stepRealCost,
    stepNetWeight,
    stepGrossWeight
  } = step.ingredients.reduce(
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
}

export function computeSectionData(section) {
  const {
    sectionCost,
    sectionRealCost,
    sectionNetWeight,
    sectionGrossWeight
  } = section.steps.reduce(
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
}

/**
 * @TODO 3 nested loops isn't a good design, check for better possibilities
 */
function computeDisplayData(recipe, isRecipe = true) {
  for (const section of recipe.sections) {
    for (const step of section.steps) {
      for (const ingredient of step.ingredients) {
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

      computeStepData(step);
    }

    computeSectionData(section);
  }

  if (isRecipe) computeRecipeData(recipe);
}

export const recipeSectionsFormInitialValues = (recipe) => {
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
        ? parseSectionToObject(recipeObject.sections)
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

  computeDisplayData(values);

  return values;
};
