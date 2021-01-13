import React, { useContext, useEffect } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import { AuthContext } from "../context/auth/authState";
import { Typography } from "@material-ui/core";
import blueprintIMG from "../assets/blueprintIMG.png";
import chooseBlueprintIMG from "../assets/chooseBlueprintIMG.png";
import ExerciseIMG from "../assets/ExerciseIMG.png";
import testExerciseIMG from "../assets/testExerciseIMG.png";
const marginBottom = {
  paddingBottom: 15,
};
const imgStyle = {
  border: "1px white dotted",
  maxWidth: "100%",
  marginBottom: "15px",
};
function Home() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <Wrapper>
      <Typography variant="h4">Glad to see you</Typography>
      <Typography variant="h6" style={marginBottom}>
        Here is a quick guide and overview of the app:
      </Typography>
      <Typography style={marginBottom}>
        1. First thing you should do is create a blueprint (schema) of the
        exercise. (You I'll find ale the options in the side bar)
      </Typography>
      <img src={blueprintIMG} style={imgStyle}></img>
      <Typography style={marginBottom}>
        2. Select blueprint to create exercise based on it.
      </Typography>
      <img src={chooseBlueprintIMG} style={imgStyle}></img>
      <Typography style={marginBottom}>
        3. Now create an exercise based on blueprint.
      </Typography>
      <img src={ExerciseIMG} style={imgStyle}></img>
      <Typography style={marginBottom}>
        4. Final step is testing yourself on exercises you created, click on the
        "get exercise button", and start solving!
      </Typography>
      <img src={testExerciseIMG} style={imgStyle}></img>
      <Typography style={marginBottom} variant="h6">
        Good luck and have fun!
      </Typography>
    </Wrapper>
  );
}

export default Home;
