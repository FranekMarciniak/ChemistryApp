import "./styles/reset.css";
import "./styles/global.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./components/UniversalComponents/Layout";
import BlueprintCreatorPage from "./pages/BlueprintCreatorPage";
import ExerciseCreatorPage from "./pages/ExerciseCreatorPage";
import ListOfExercisesPage from "./pages/ListOfExercisesPage";
import ExercisesPage from "./pages/ExercisesPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ExerciseCreatorState from "./context/exerciseCreator/exerciseCreatorState";
import BlueprintCreatorState from "./context/blueprintCreator/blueprintCreatorState";
import AuthState from "./context/auth/authState";
import setTokenToLocalstorage from "./util/setTokenToLocalstorage";
import { AuthContext } from "./context/auth/authState";
import PrivateRoute from "./components/UniversalComponents/PrivateRoute";
import ListOfBlueprintsPage from "./pages/ListOfBlueprintsPage";
import { useContext, useEffect } from "react";
if (localStorage.token) {
  setTokenToLocalstorage(localStorage.token);
}
function App() {
  return (
    <Router>
      <ExerciseCreatorState>
        <BlueprintCreatorState>
          <AuthState>
            <Layout>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <PrivateRoute
                  exact
                  path="/blueprint"
                  component={BlueprintCreatorPage}
                />
                <PrivateRoute exact path="/home" component={HomePage} />
                <PrivateRoute
                  exact
                  path="/example"
                  component={ExerciseCreatorPage}
                />
                <PrivateRoute exact path="/test" component={ExercisesPage} />
                <PrivateRoute
                  exact
                  path="/listOfExercises"
                  component={ListOfExercisesPage}
                />
                <PrivateRoute
                  exact
                  path="/listOfBlueprints"
                  component={ListOfBlueprintsPage}
                />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/login" component={LoginPage} />
              </Switch>
            </Layout>
          </AuthState>
        </BlueprintCreatorState>
      </ExerciseCreatorState>
    </Router>
  );
}

export default App;
