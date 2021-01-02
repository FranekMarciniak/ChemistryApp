import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import MiddleArrow from "../UniversalComponents/MiddleArrow";
import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";
import { Button, Typography, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExerciseName from "./ExerciseName";
import SmallMiddleArrow from "../../components/UniversalComponents/SmallMiddleArrow";
const ExerciseFormWrapper = styled.div`
  width: 90%;
  height: 100px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 25px;
  display: flex;
  button {
    margin-left: 15px;
  }
`;

function ExerciseCreatorForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Using useContext hook to bring in global state
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  //Destructuring methods from global context
  const {
    currentExercise,
    currentBlueprint,
    setExerciseFromBlueprint,
    getTestExerciseFromAPI,
    postTestExerciseToAPI,
    testExercise,
  } = exerciseCreatorContext;

  useEffect(() => {
    setExerciseFromBlueprint(currentBlueprint);
  }, [currentBlueprint]);
  return (
    <ExerciseFormWrapper>
      {currentExercise.leftSide !== undefined &&
      currentExercise.rightSide !== undefined &&
      currentExercise.rightSide.length > 0 &&
      currentExercise.leftSide.length > 0 ? (
        <ExerciseName />
      ) : (
        <Typography variant="h4">
          Hello, click button below to get your first exercise!
        </Typography>
      )}
      <LeftSide />
      {currentBlueprint.leftSide > 0 && currentBlueprint.rightSide > 0 ? (
        <MiddleArrow top={currentBlueprint.top} />
      ) : null}
      <RightSide />
      <ButtonWrapper>
        <Button variant="contained" onClick={getTestExerciseFromAPI}>
          Get new exercise!
        </Button>
        {currentExercise.leftSide === undefined ||
        currentExercise.leftSide.length > 0 ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Show me the answer
            </Button>
            <Button
              variant="contained"
              onClick={() => postTestExerciseToAPI(currentExercise)}
            >
              Check!
            </Button>
          </>
        ) : null}
      </ButtonWrapper>
      {testExercise.leftSide !== undefined &&
      testExercise.rightSide !== undefined &&
      testExercise.rightSide.length > 0 &&
      testExercise.leftSide.length > 0 ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{testExercise.name}</DialogTitle>
          <DialogContent
            style={{
              width: "300px",
              display: "flex",
            }}
          >
            <DialogContentText id="alert-dialog-description">
              {testExercise.leftSide.map((blob, index) => {
                let last = " + ";
                if (index >= testExercise.leftSide.length - 1) {
                  last = "";
                }
                return blob.ratio + " " + blob.value + last;
              })}
            </DialogContentText>
            <SmallMiddleArrow text={testExercise.top} />
            <DialogContentText id="alert-dialog-description">
              {testExercise.rightSide.map((blob, index) => {
                let last = " + ";
                if (index >= testExercise.rightSide.length - 1) {
                  last = "";
                }
                return blob.ratio + " " + blob.value + last;
              })}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : null}
    </ExerciseFormWrapper>
  );
}

export default ExerciseCreatorForm;
