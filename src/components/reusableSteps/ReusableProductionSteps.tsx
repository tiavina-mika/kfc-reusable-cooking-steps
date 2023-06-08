import React from "react";
import { Add } from "@mui/icons-material";

import {
  Box,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import ReusableStepsTableHead from "./list/ReusableStepsTableHead";

type Props = {
  steps: Record<string, any>;
  goToStepCreation: () => void;
  onSelectStep: (step: Record<string, any>) => void;
};
const ReusableProductionSteps = ({
  onSelectStep,
  steps,
  goToStepCreation
}: Props) => {
  return (
    <Box bgcolor="#fff">
      {/* --------- top --------- */}
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
          Etapes Réutilisables
        </Typography>
      </Box>
      {/* --------- table --------- */}
      <Table aria-labelledby="tableTitle">
        <ReusableStepsTableHead />
        <TableBody>
          {steps.map((step) => {
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={step.objectId}
                onClick={() => onSelectStep(step)}
              >
                <TableCell>{step.name}</TableCell>
                <TableCell>{step.cost}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* --------- add button --------- */}
      <Box sx={{ position: "absolute", left: 30, bottom: 20 }}>
        <Fab color="primary" onClick={goToStepCreation}>
          <Add />
        </Fab>
      </Box>
    </Box>
  );
};

export default ReusableProductionSteps;
