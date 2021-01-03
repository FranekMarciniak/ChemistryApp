import React, { useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { AuthContext } from "../../context/auth/authState";
import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: "10%",
    backgroundColor: "#1A1A1A",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Header() {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { isAuthenticated, logout } = authContext;
  // eslint-disable-next-line
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const { clearAll } = exerciseCreatorContext;
  const publicMenu = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];
  const privateList = [
    { name: "Home", path: "/" },
    { name: "Create blueprint", path: "/blueprint" },
    { name: "Create example", path: "/example" },
    { name: "Test yourself", path: "/test" },
    { name: "View the list", path: "/list" },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar
        position="relative"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            ChemionatorX
          </Typography>
          {isAuthenticated === null || isAuthenticated === false ? (
            <>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "rgba(255, 255, 255, 0.87)",
                }}
              >
                <Button color="inherit">Login</Button>
              </Link>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "rgba(255, 255, 255, 0.87)",
                }}
              >
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={(e) => {
                logout();
                clearAll();
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {isAuthenticated === null || isAuthenticated === false ? (
          <List>
            {publicMenu.map((blob, index) => (
              <Link
                to={blob.path}
                key={blob.name}
                style={{
                  textDecoration: "none",
                  color: "rgba(255, 255, 255, 0.87)",
                }}
              >
                <ListItem button onClick={() => setOpen(false)}>
                  <ListItemText primary={blob.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        ) : (
          <List>
            {privateList.map((blob, index) => (
              <Link
                to={blob.path}
                key={blob.name}
                style={{
                  textDecoration: "none",
                  color: "rgba(255, 255, 255, 0.87)",
                }}
              >
                <ListItem button onClick={() => setOpen(false)}>
                  <ListItemText primary={blob.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        )}
      </Drawer>
    </>
  );
}

export default Header;
