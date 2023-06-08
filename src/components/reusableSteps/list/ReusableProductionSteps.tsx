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

type Props = {
  steps: Record<string, any>;
  goToStepCreation: () => void;
};
const ReusableProductionSteps = ({ steps, goToStepCreation }: Props) => {
  return (
    <Box bgcolor="#fff">
      {/* --------- top --------- */}
      <Box sx={{ px: 2, py: 3 }}>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
            Etapes Réutilisables
          </Typography>
        </Box>
      </Box>
      {/* --------- table --------- */}
      <Table aria-labelledby="tableTitle">
        <ReusableStepsTableHead
          onSelectAll={handleSelectAll}
          numSelected={selectedSteps.length}
          rowCount={steps.length}
        />
        <TableBody>
          {steps.map((step) => {
            return (
              <TableRow hover tabIndex={-1} key={step.objectId}>
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
