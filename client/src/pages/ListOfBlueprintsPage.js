import React, { useContext, useEffect } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import { makeStyles } from "@material-ui/core/styles";
import AlertWidget from "../components/UniversalComponents/AlertWidget";
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
    getBlueprintsFromAPI,
    blueprints,
    deleteBlueprintFromAPI,
  } = exerciseCreatorContext;
  useEffect(() => {
    getBlueprintsFromAPI();
  }, []);
  const classes = useStyles();
  return (
    <Wrapper>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Blueprint</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blueprints.map((blob) => (
              <TableRow key={blob._id}>
                <TableCell>{blob.name}</TableCell>
                <TableCell>
                  Left: {blob.leftSide}, Right: {blob.rightSide} and Top:{" "}
                  {blob.top.toString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    className={classes.iconButton}
                    id={blob._id}
                    onClick={(e) => deleteBlueprintFromAPI(e.currentTarget.id)}
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
