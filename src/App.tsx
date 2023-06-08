import { useState } from "react";
import CreateReusableStep from "./components/reusableSteps/CreateReusableStep";
import ReusableProductionSteps from "./components/reusableSteps/ReusableProductionSteps";

type IPage = "form" | "list";

const App = () => {
  const [steps, setSteps] = useState([]);
  // simulate page with route
  const [page, setPage] = useState<IPage>("list");
  const [selectedStep, setSelectedStep] = useState<Record<string, any> | null>(
    null
  );
  // return <Recipe recipe={recipe} genericSections={sections} />;
  const handleStepCreation = (step) => {
    setSteps((prev) => [step, ...prev]);
    setPage("list");
  };

  const handleCancelForm = () => {
    setPage("list");
  };

  const goToStepCreation = () => {
    setPage("form");
  };

  const handleSelectStep = (step: Record<string, any>) => {
    setSelectedStep(step);
    setPage("form");
  };

  if (page === "form") {
    return (
      <CreateReusableStep
        onCancel={handleCancelForm}
        onSave={handleStepCreation}
        step={selectedStep}
      />
    );
  }

  return (
    <ReusableProductionSteps
      goToStepCreation={goToStepCreation}
      steps={steps}
      onSelectStep={handleSelectStep}
    />
  );
};

export default App;
