import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withStyles, AppBar,Toolbar,IconButton,Typography,Button,Menu,MenuItem,Drawer, useTheme,Divider,Avatar,List,
    ListItemIcon,ListItem,ListItemText} from "@material-ui/core";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuIcon from '@material-ui/icons/Menu';

import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import axios from 'axios'
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240

const styles = theme => ({
    root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
    drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
    drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
    title: {
        flex: 1
    },
})
//const theme = useTheme()
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            names : Object.values(this.props.value).map((k,v) =>  k["name"]),
            open_menu : false,
        }
    }

    logout = (e) =>{
        axios.get('http://localhost:8000/ToDo/logout/').then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    handleDrawerOpen = (e) =>{
        e.preventDefault()
        this.setState({open : true})
    }
    handleDrawerClose = (e) =>{
        e.preventDefault()
        this.setState(({open: false}))
    }
    render(){
        const {classes}= this.props
        const menuId = 'primary-search-account-menu';
        return(
            <div className={classes.root}>
                <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: this.state.open,
        })}>
                <Toolbar>
                    <IconButton edge="start" className={clsx(classes.menuButton, this.state.open && classes.hide)}
                                color="inherit" aria-label="open drawer" edge = "start" onClick={this.handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit" className={classes.button} onClick={this.logout}><ExitToAppIcon
                    /></Button>
                </Toolbar>
            </AppBar>
            <Drawer className={clsx(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open,
        })} variant="permanent" classes={{
          paper: clsx({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          }),
        }}>
                <div className={classes.drawerHeader}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} onClick={this.handleDrawerClose} />

                </div>
                <Divider />
                <List>
                    {["My Day","To Do"].map((text,index) => (
                    <ListItem button key = {text}>
                        <ListItemIcon>{index % 2 === 0 ?<WbSunnyIcon/> : <ListAltIcon/>}</ListItemIcon>
                        <ListItemText primary={text} />
                        <br/>
                    </ListItem>))}
                </List>
            </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(Home)

/*
<Grid container direction = "column" spacing ={3}>
                    {this.state.names.map((name,index) =>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>{name}</Paper>
                        </Grid>
                    )}
                </Grid>

 */