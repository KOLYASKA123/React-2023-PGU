import React from "react"
import lg from '../../img/logo192.png'
import { Link } from "react-router-dom"

const Header = () => {
    return (
    <Link to="/kyda-to" className="NAMEOFSITE">
        <img src={lg} style = {{width: '25px', height: '25px', verticalAlign: 'middle'}}></img>
        {"СаЙт В хАцКеРсКиХ тОнАх"} 
    </Link>
    )
}

export default Header