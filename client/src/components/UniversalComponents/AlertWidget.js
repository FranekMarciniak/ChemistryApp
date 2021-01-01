import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
const AlertWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  padding: 0px;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent: "center",
  },
}));

function AlertWidget({ errors }) {
  const classes = useStyles();
  return (
    <AlertWrapper>
      {errors.map((error, index) => (
        <Alert
          severity={error.severity}
          variant="outlined"
          className={classes.root}
          key={index}
        >
          {error.data}
        </Alert>
      ))}
    </AlertWrapper>
  );
}

export default AlertWidget;
