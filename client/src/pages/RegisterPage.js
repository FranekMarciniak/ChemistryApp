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

function RegisterPage(props) {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  useEffect(() => {
    if (authContext.isAuthenticated === true) {
      props.history.push("/home");
    }
  }, [authContext.isAuthenticated, props.history]);
  const [form, setFrom] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.registerUser({
      name: form.name,
      email: form.email.toLowerCase(),
      password: form.password,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormRow>
        <Typography className={classes.typography}>Your login</Typography>
        <TextField
          required
          label="Enter your login"
          id="login"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textFiled}
          value={form.name}
          onChange={(e) => setFrom({ ...form, name: e.target.value })}
        />
      </FormRow>
      <FormRow>
        <Typography className={classes.typography}>Your email</Typography>
        <TextField
          required
          label="Enter your email"
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
          label="Enter your password"
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
          type="submit"
          color="primary"
          disableElevation
          className={classes.button}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </FormRow>
    </form>
  );
}
export default RegisterPage;
