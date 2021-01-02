import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Typography,
  makeStyles,
  Button,
  FormControl,
} from "@material-ui/core";
import styled from "styled-components";
import { AuthContext } from "../context/auth/authState";

const FormRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-items: center;
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
    width: "150px",
    fontSize: "16px",
    fontWeight: "600",
  },
  button: {
    height: "40px",
  },
});

function LoginPage(props) {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const [form, setFrom] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (authContext.isAuthenticated === true) {
      props.history.push("/");
    }
  }, [authContext.isAuthenticated, props.history]);
  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.loginUser({
      email: form.email.toLowerCase(),
      password: form.password,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormRow>
        <Typography className={classes.typography}>Your email</Typography>
        <TextField
          required
          label="Enter your mail"
          id="email"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textFiled}
          value={form.email}
          onChange={(e) => setFrom({ ...form, email: e.target.value })}
        />
      </FormRow>
      <FormRow>
        <Typography className={classes.typography}>Your password</Typography>
        <TextField
          required
          label="Ener your password"
          id="password"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textFiled}
          value={form.password}
          onChange={(e) => setFrom({ ...form, password: e.target.value })}
        />
      </FormRow>
      <FormRow>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
          className={classes.button}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </FormRow>
    </form>
  );
}
export default LoginPage;
