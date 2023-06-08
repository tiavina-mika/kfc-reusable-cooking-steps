import { useState } from "react";
import CreateReusableStep from "./components/reusableSteps/CreateReusableStep";
import ReusableProductionSteps from "./components/reusableSteps/ReusableProductionSteps";
// import Recipe from "./Recipe";
// import { recipe } from "./utils/data/recipe";
// import { sections } from "./utils/data/section";
type Page = "creation" | "edition" | "list";

const App = () => {
  const [steps, setSteps] = useState([]);
  const [page, setPage] = useState<Page>("list");
  // return <Recipe recipe={recipe} genericSections={sections} />;
  const handleStepCreation = (step) => {
    setSteps((prev) => [step, ...prev]);
    setPage("list");
  };

  const handleCancelForm = () => {
    setPage("list");
  };

  const goToStepCreation = () => {
    setPage("creation");
  };

  if (page === "creation") {
    return (
      <CreateReusableStep
        onCancel={handleCancelForm}
        onSave={handleStepCreation}
      />
    );
  }

  if (page === "edition") {
    return (
      <CreateReusableStep
        onCancel={handleCancelForm}
        onSave={handleStepCreation}
      />
    );
  }

  return (
    <ReusableProductionSteps
      goToStepCreation={goToStepCreation}
      steps={steps}
    />
  );
};

export default App;
