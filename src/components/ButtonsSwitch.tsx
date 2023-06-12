import { Box, Button, Theme, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useState } from "react";

import { ISelectOption, ISelectedOptionValue } from "../types/app.type";

const sx = {
  root: {
    borderRadius: 100,
    backgroundColor: grey[100],
    padding: 2,
    height: 40,
    width: 500
  },
  activeButton: {
    backgroundColor: blue[500]
  },
  inactiveButton: {
    cursor: "pointer"
  },
  defaultButton: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: 100,
    border: "none"
  },
  activeLabel: {
    color: "#fff"
  }
};

type Props = {
  options: ISelectOption[];
  onSelect: (value: ISelectedOptionValue) => void;
};
const ButtonsSwitch = ({ options, onSelect }: Props) => {
  const [checkedOption, setCheckedOption] = useState<ISelectedOptionValue>(
    options[0].value
  );

  const handleCheck = (value: ISelectedOptionValue) => {
    setCheckedOption(value);
    onSelect(value);
  };
  return (
    <Box sx={sx.root} className="flexRow center">
      {options.map((option: ISelectOption, index: number) => (
        <Button
          key={index}
          sx={{
            ...sx.defaultButton,
            ...(option.value === checkedOption
              ? sx.activeButton
              : sx.inactiveButton)
          }}
          className="flex1 stretchSel"
          onClick={() => handleCheck(option.value)}
        >
          <Typography
            variant="body2"
            sx={{
              color: (theme: Theme) => theme.palette.grey[600],
              ...(option.value === checkedOption ? sx.activeLabel : {})
            }}
          >
            {option.label}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default ButtonsSwitch;
