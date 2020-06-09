import React from "react";
import {Navbar} from "react-bootstrap";

class CustomNav extends React.Component{
    render(){
        return(
            <div id = "nav">
            <Navbar bg ="light" >
                <Navbar.Brand href="#home">ToDo</Navbar.Brand>
            </Navbar>
            </div>
        )
    }
}
export default CustomNav