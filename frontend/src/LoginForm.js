import React from "react";
import "./LoginForm.css"
import {Container, CssBaseline, withStyles, Avatar, Typography, TextField, Button, colors} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import axios from 'axios'
import Home from "./Components/home"

axios.defaults.withCredentials = true

const styles = theme => ({
            page :{
                marginTop : theme.spacing(10),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar:{
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form:{
                width: '100%',
                marginTop: theme.spacing()
            },
            submit: {
                margin: theme.spacing(3,0,2)
            }
        })
class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            value : "",
            password: "",
            error: "",
            abc: ""
        }

    }
    handleChange = (e) => {
        this.setState({username : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.password, this.state.username)
        axios.post('http://localhost:8000/ToDo/login/', {username: this.state.username,
            password: this.state.password,}).then(res => {
            this.setState({success: "true", abc : Object.keys(res.data.data).map(i => res.data.data[i])})
        }).catch(err => {
            let res = err.response
            if (res.status == 403){
                this.setState({error : "Please Provide the Correct Credentials"})
        }})
        this.setState({value : "working"})
        //console.log(this.state.username)
    }

    render() {
        const {classes}= this.props
        return (
            <div>
            {(this.state.success) ? <Home value = {this.state.abc}/> :
                (<Container component = "main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.page}>
                   <Avatar className={classes.avatar}>
                    <LockOutlined/>
                   </Avatar>
                    <Typography component ="h1" variant ="h5">
                        Login
                    </Typography>
                    <form className={classes.form}>
                        <TextField variant="outlined" margin="normal" required fullWidth id = "username"
                                   label = "Username" onChange={this.handleChange} value = {this.state.username}/>

                        <TextField variant="outlined" margin="normal" required fullWidth id = "password"
                                   label = "Password" type  = "password"
                                   onChange={(e) => {this.setState({password : e.target.value})}}
                                   value = {this.state.password}/>
                    </form>
                    {(this.state.error) ? <p style={{color : 'red'}}>{this.state.error}</p> : null}
                    <Button type ="submit" fullWidth variant="contained" color ="secondary"
                            onClick={this.handleSubmit} className = {classes.submit}>Login</Button>

                </div>

            </Container>)
            }
            </div>
        )
        ;
    }
}
export default withStyles(styles)(LoginForm)
