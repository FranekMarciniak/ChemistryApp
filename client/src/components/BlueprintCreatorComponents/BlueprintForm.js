//Component info:
//

import React, { useContext } from "react";
import styled from "styled-components";
import {
  TextField,
  Typography,
  makeStyles,
  Switch,
  Button,
  Input,
} from "@material-ui/core";
import { BlueprintCreatorContext } from "../../context/blueprintCreator/blueprintCreatorState";

const FormRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-items: center;
`;
const BlueprintFormWrapper = styled.div`
  width: 90%;
`;

const useStyles = makeStyles({
  textFiled: {
    marginLeft: "15px",
  },
  textFiledNumber: {
    width: "90px",
    marginLeft: "15px",
  },
  typography: {
    width: "200px",
    fontSize: "16px",
    fontWeight: "600",
  },
  button: {
    height: "40px",
  },
});

const BlueprintForm = () => {
  //geting custom material ui classes from useStyles hook
  const classes = useStyles();
  const blueprintCreatorContext = useContext(BlueprintCreatorContext);
  const {
    //these are methods for creating and storing blueprint information in blueprintCreator Context
    setBlueprintLeft,
    setBlueprintName,
    setBlueprintRight,
    setBlueprintTop,
    postBlueprintToAPI,
    state,
  } = blueprintCreatorContext;
  return (
    <BlueprintFormWrapper>
      <FormRow>
        <Typography className={classes.typography}>
          Podaj Nazwę blueprinttu
        </Typography>
        <TextField
          required
          label="Nazwa blueprinttu"
          id="name"
          InputLabelProps={{
            shrink: true,
          }}
          value={state.name}
          className={classes.textFiled}
          onChange={(e) => {
            setBlueprintName(e.target.value);
          }}
        />
      </FormRow>

      <FormRow>
        <Typography className={classes.typography}>
          Podaj liczbę substraktów
        </Typography>
        <TextField
          required
          size="small"
          label="Numer"
          type="number"
          id="leftSide"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textFiledNumber}
          value={state.leftSide}
          onChange={(e) => setBlueprintLeft(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <Typography className={classes.typography}>
          Podaj liczbę produktów
        </Typography>
        <TextField
          required
          size="small"
          type="number"
          label="Numer"
          id="rightSide"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textFiledNumber}
          value={state.rightSide}
          onChange={(e) => setBlueprintRight(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Typography className={classes.typography}>
          Czy chcesz dyngs nad strzałką
        </Typography>
        <Switch
          name="checkedA"
          id="top"
          inputProps={{ "aria-label": "secondary checkbox" }}
          onChange={(e) => {
            setBlueprintTop(e.target.checked);
          }}
          checked={state.top}
        />
      </FormRow>
      <FormRow>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          className={classes.button}
          onClick={postBlueprintToAPI}
        >
          Dodaj Blueprintt
        </Button>
      </FormRow>
    </BlueprintFormWrapper>
  );
};

export default BlueprintForm;
