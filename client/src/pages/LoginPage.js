import React, { useState, useContext, useEffect } from "react";
import { TextField, Typography, makeStyles, Button } from "@material-ui/core";
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
  return (
    <div>
      <FormRow>
        <Typography className={classes.typography}>Twój email</Typography>
        <TextField
          required
          label="Wpisz email"
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
        <Typography className={classes.typography}>Twoje hasło</Typography>
        <TextField
          required
          label="Wpisz hasło"
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
          color="secondary"
          disableElevation
          className={classes.button}
          onClick={(e) =>
            authContext.loginUser({
              email: form.email.toLowerCase(),
              password: form.password,
            })
          }
        >
          Login
        </Button>
      </FormRow>
    </div>
  );
}
export default LoginPage;
