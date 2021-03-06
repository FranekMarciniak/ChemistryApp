import React, { useContext } from "react";
import styled from "styled-components";
import {
  TextField,
  Typography,
  makeStyles,
  Switch,
  Button,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    postBlueprintToAPI();
  };
  return (
    <form onSubmit={handleSubmit}>
      <BlueprintFormWrapper>
        <FormRow>
          <Typography className={classes.typography}>Blueprint name</Typography>
          <TextField
            required
            label="Enter blueprint name"
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
            Enter number of substrates
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
            Enter number of products
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
            That thig above the arrow
          </Typography>
          <Switch
            name="checkedA"
            id="top"
            onChange={(e) => {
              setBlueprintTop(e.target.checked);
            }}
            checked={state.top}
          />
        </FormRow>
        <FormRow>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disableElevation
            className={classes.button}
            onClick={handleSubmit}
          >
            Add blueprint
          </Button>
        </FormRow>
      </BlueprintFormWrapper>
    </form>
  );
};

export default BlueprintForm;
