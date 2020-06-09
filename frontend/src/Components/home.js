import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withStyles, AppBar,Toolbar,IconButton,Typography,Button,Menu,MenuItem,Drawer,
        Divider,Avatar,List, ListItemIcon,ListItem,ListItemText,Card,
        CardContent,CardHeader,CardActionArea,CardActions,CardMedia} from "@material-ui/core";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import axios from 'axios'
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
        flex: 1,
        color: theme.palette.secondary.light
    },
    card: {
        //  display: 'flex',
        minWidth: 275,
        minHeight: 200,
        marginTop : 100,
        marginLeft: 50,
        //backgroundColor: theme.palette.primary.light
    },
    avatarCard: {
        backgroundColor: theme.palette.secondary.light,
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
})
//const theme = useTheme()
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            ToDos : Object.values(this.props.value).map((k,v) =>  k),
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
                        ToDo
                    </Typography>
                    <Button color="inherit" className={classes.button} onClick={this.logout}><ExitToAppIcon
                    /></Button>
                </Toolbar>
            </AppBar>
            <Drawer className={clsx(classes.drawer, {[classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,})} variant="permanent" classes={{paper: clsx({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,}),}}>
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
                <Grid container spacing ={4}>
                {this.state.ToDos.map((todo, index) => (<Card className={classes.card} variant = "outlined">
                    <CardHeader
                    avatar={
                            <Avatar aria-label="recipe" className={classes.avatarCard}>
                                {todo.name[0]}
                            </Avatar>
                     }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    //title={todo.name}
                    //subheader={todo.created_at}
                        />
                        <Divider/>
                        <CardMedia
                            className = {classes.media} image = {require("../static/mountains.jpg")}/>
                    <CardContent >
                       <Typography variant = "h5" component = "h2"  color="textPrimary" gutterBottom>
                           {todo.name}
                        </Typography>
                        <Typography variant = "body" component = "p" color= "textSecondary">
                            {todo.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>))}
                </Grid>

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