import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { Box } from "@mui/material";
import { COLORS } from "../../utils/constant";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: "0 20px",
    // height: "100%",
    borderBottom: `1px solid ${COLORS.DEFAULT_GREY}`,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#fff"
  },
  leftAction: {
    marginRight: 10,
    display: "flex",
    alignItems: "center"
  },
  title: {
    display: "flex",
    alignItems: "center"
  },
  info: {
    display: "flex",
    alignItems: "center"
  },
  rightAction: {
    // marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1
  }
});

type Props = {
  leftAction?: any;
  title?: string;
  info?: any;
  rightAction?: any;
  className?: string;
  sx?: any;
};

const GenericTopBarHeader: FC<Props> = ({
  leftAction,
  title,
  info,
  rightAction,
  className,
  sx
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.container, className)}
      sx={{ height: 64, ...sx }}
    >
      {leftAction && <div className={classes.leftAction}>{leftAction}</div>}
      {title && <div className={classes.title}>{title}</div>}
      {info && <div className={classes.info}>{info}</div>}
      {rightAction && <div className={classes.rightAction}>{rightAction}</div>}
    </Box>
  );
};

export default GenericTopBarHeader;
