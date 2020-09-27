import { AppBar, Drawer, IconButton, List, ListItem, ListItemText, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons'
import React, { useCallback, useState } from 'react';
import { Pin } from '../components/icons';
import Pages from './Pages';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "15px",
    marginLeft: "5px"
  },
  title: {
    flexGrow: 1,
    fontSize: "22px"
  },
  appBar: {
    background: "white",
    "&  .MuiToolbar-root": {
      minHeight: "64px !important",
      paddingLeft: "24px !important",
      paddingRight: "24px !important",
    }
  },
  drawer: {
    width: "200px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "200px",
    height: "calc(100vh - 64px)",
    marginTop: "64px",
    borderRight: "0px"
  },
  listItem: {
    marginTop: "10px",
    height: "60px",
    color: theme.palette.secondary.main,
    "&:hover": {
      background: "rgba(165, 233, 225, 0.2)"
    }
  },
  selected: {
    background: "rgba(165, 233, 225, 0.2) !important"
  },
  pin: {
    width: "30px",
    height: "30px",
    stroke: theme.palette.secondary.main
  },
  content: {
    display:"block",
    height: "calc(100vh - 112px)",
    position: "relative",
    padding: "24px",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  }, 
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 200,
  },
}));

const App = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(window.innerWidth > 768)
  const [selectedItem, setSelectedItem] = useState<number>(0)

  const menuItems = [{
    id: "studentRoom",
    label: "Discussion étudiant",
    goto: () => { }
  }, {
    id: "studentTeacherRoom",
    label: "Discussion étudiant-professeur",
    goto: () => { }
  }, {
    id: "classes",
    label: "Cours",
    goto: () => { }
  }]

  const toggleDrawer = useCallback(
    (open: boolean) => {
      setDrawerOpen(open)
    },
    []
  )

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="secondary" className={classes.menuButton} aria-label="menu" onClick={() => toggleDrawer(!drawerOpen)}>
            <Menu />
          </IconButton>
          <Typography color="secondary" variant="h6" className={`${classes.title} vigaFamily`}>
            APIDAE
          </Typography>
          <IconButton edge="start" color="secondary" aria-label="menu">
            <Pin className={classes.pin} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        variant="persistent"
        onClose={() => toggleDrawer(false)}
        className={classes.drawer}
        PaperProps={{ elevation: 1 }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List aria-label="menu">
          {menuItems.map((item, index) => (
            <ListItem
              key={item.id}
              button
              selected={selectedItem === index}
              className={classes.listItem}
              classes={{ selected: classes.selected }}
            >
              <ListItemText primary={item.label} classes={{ primary: "vigaFamily" }} />
            </ListItem>
          ))
          }
        </List>
      </Drawer>
      <div className={`${classes.content} ${drawerOpen ? classes.contentShift : ""}`}>
        <Pages />
      </div>
    </div>
  );
}

export default App;
