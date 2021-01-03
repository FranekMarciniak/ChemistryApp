import React, { useContext, useEffect } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import { makeStyles } from "@material-ui/core/styles";
import AlertWidget from "../components/UniversalComponents/AlertWidget";
import EditIcon from "@material-ui/icons/Edit";
import SmallMiddleArrow from "../components/UniversalComponents/SmallMiddleArrow";
import IconButton from "@material-ui/core/IconButton";
import { ExerciseCreatorContext } from "../context/exerciseCreator/exerciseCreatorState";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    maxWidth: 850,
  },
  iconButton: {
    padding: 5,
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
  },
});

function ListOfExercises() {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const {
    getAllExercisesFromAPI,
    allExercises,
    deleteExerciseFromAPI,
  } = exerciseCreatorContext;
  useEffect(() => {
    getAllExercisesFromAPI();
  }, []);
  const classes = useStyles();
  return (
    <Wrapper>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Exercise</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExercises.map((blob) => (
              <TableRow key={blob._id}>
                <TableCell component="th" scope="row">
                  {blob.exercise.name}
                </TableCell>
                <TableCell className={classes.tableRow} align="center">
                  <Typography>
                    {blob.exercise.leftSide.map((b, index) => {
                      let last = " + ";
                      if (index >= blob.exercise.leftSide.length - 1) {
                        last = "";
                      }
                      return b.ratio + " " + b.value + last;
                    })}
                  </Typography>
                  <SmallMiddleArrow text={blob.exercise.top} />
                  <Typography>
                    {blob.exercise.rightSide.map((b, index) => {
                      let last = " + ";
                      if (index >= blob.exercise.rightSide.length - 1) {
                        last = "";
                      }
                      return b.ratio + " " + b.value + last;
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    className={classes.iconButton}
                    id={blob._id}
                    onClick={(e) => deleteExerciseFromAPI(e.currentTarget.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}

export default ListOfExercises;
