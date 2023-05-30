import React, { FC } from "react";

import { Box, Button, Icon, Stack, styled, Typography } from "@mui/material";

import { COLORS } from "../../utils/constant";
import GenericTopBarHeader from "./GenericTopBarHeader";

type StyledIconProps = {
  iconColor: string;
};

const StyledIcon = styled(Icon, {
  shouldForwardProp: (prop) => prop !== "iconColor"
})<StyledIconProps>((props) => ({
  marginRight: 10,
  color: props.iconColor,
  height: 24
}));

const sx = {
  genericHeaderContainer: {
    height: 64,
    width: "100%",
    bgcolor: "#fff",
    zIndex: 1000
  }
};

type Props = {
  // withBackButton: boolean;
  subtitle?: string;
  title: string;
  icon: any;
  className?: string;
  rightAction?: any;
  onCancel: () => void;
  onConfirm: () => void;
  color?: string;
  fixed?: boolean;
};
const PageHeader: FC<Props> = ({
  // withBackButton,
  subtitle,
  title,
  icon,
  className,
  rightAction,
  onCancel,
  onConfirm,
  color = COLORS.HEAD_SEAZON,
  fixed = true
}) => {
  const renderRightAction = () => {
    if (onConfirm) {
      return (
        <Stack direction="row" spacing={5}>
          <Button onClick={onCancel}>Annuler</Button>
          <Button onClick={onConfirm} variant="contained">
            Enregistrer
          </Button>
        </Stack>
      );
    }

    if (rightAction) {
      return rightAction;
    }

    return null;
  };

  return (
    <Box sx={sx.genericHeaderContainer} position={fixed ? "fixed" : "relative"}>
      <GenericTopBarHeader
        className={className}
        title={
          <Box display="flex" alignItems="center">
            <StyledIcon iconColor={color}>{icon}</StyledIcon>
            <Typography
              variant="h6"
              color="textPrimary"
              sx={{ color, margin: 0 }}
              gutterBottom
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ fontWeight: 400 }}
              >
                &nbsp;- {subtitle}
              </Typography>
            )}
          </Box>
        }
        // leftAction={withBackButton ? <GenericHeaderReturnButton handleClick={() => {}}/> : null}
        rightAction={renderRightAction()}
      />
    </Box>
  );
};

export default PageHeader;
