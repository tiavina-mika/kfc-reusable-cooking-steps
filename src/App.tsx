import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ButtonsSwitch from "./components/ButtonsSwitch";
import Recipe from "./Recipe";
import { ISelectOption } from "./types/app.type";
import ReusableStepForm from "./components/reusableSteps/ReusableStepForm";
import ReusableProductionSteps from "./components/reusableSteps/ReusableProductionSteps";
import { recipe } from "./utils/data/recipe";
import { sections } from "./utils/data/section";

type IPage = "form" | "list";
type IFeature = "reusableSteps" | "recipe";

const featuresOptions: ISelectOption<IFeature>[] = [
  {
    label: "Reusable Steps",
    value: "reusableSteps"
  },
  {
    label: "Recipe",
    value: "recipe"
  }
];
const App = () => {
  const [features, setFeatures] = useState<IFeature>("recipe");
  const [steps, setSteps] = useState([]);
  // simulate page with route
  const [page, setPage] = useState<IPage>("list");
  const [selectedStep, setSelectedStep] = useState<Record<string, any> | null>(
    null
  );

  const handleStepCreation = (step) => {
    setSteps((prev) => [step, ...prev]);
    setPage("list");
  };

  const handleChangeFeature = (value: IFeature) => setFeatures(value);

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

  if (page === "form" && features === "reusableSteps") {
    return (
      <ReusableStepForm
        onCancel={handleCancelForm}
        onSave={handleStepCreation}
        step={selectedStep}
      />
    );
  }

  return (
    <Box>
      <Box sx={{ p: 2, borderBottom: "1px solid " + grey[300] }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>Choose features:</Typography>
          <ButtonsSwitch
            options={featuresOptions}
            onSelect={handleChangeFeature}
          />
        </Stack>
      </Box>
      {features === "reusableSteps" ? (
        <ReusableProductionSteps
          goToStepCreation={goToStepCreation}
          steps={steps}
          onSelectStep={handleSelectStep}
        />
      ) : (
        <Recipe recipe={recipe} genericSections={sections} />
      )}
    </Box>
  );
};

export default App;
