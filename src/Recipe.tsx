import { FC, useState } from "react";

import ProductionSteps from "./components/productionSteps/ProductionSteps";

type Props = {
  recipe: Record<string, any>;
  genericSections: Record<string, any>[];
};
const Recipe: FC<Props> = ({ recipe, genericSections }) => {
  const [isProductionStepsEdition, setProductionStepsIsEdition] = useState<
    boolean
  >(false);

  const toggleProductionStepsIsEdition = () =>
    setProductionStepsIsEdition(!isProductionStepsEdition);

  const onEditProductionSteps = () => {
    toggleProductionStepsIsEdition();
  };

  const onSaveProductionSteps = (values) => {
    console.log("onSaveProductionSteps values", values);
    toggleProductionStepsIsEdition();
  };

  const onCancelProductionSteps = () => {
    console.log("onCancelProductionSteps");
    toggleProductionStepsIsEdition();
  };

  // just simulate the existing recipe code
  if (isProductionStepsEdition) {
    return (
      <ProductionSteps
        onSave={onSaveProductionSteps}
        onCancel={onCancelProductionSteps}
        isEdition
        recipe={recipe}
        genericSections={genericSections}
      />
    );
  }

  return (
    <ProductionSteps toggleEditForm={onEditProductionSteps} recipe={recipe} />
  );
};

export default Recipe;
