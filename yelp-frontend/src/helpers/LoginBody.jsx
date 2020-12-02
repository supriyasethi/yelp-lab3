import React from 'react';
import {Grid} from '@material-ui/core';
import LoginForm from './LoginForm';
import logo from '../assets/LoginPageimg.PNG';

const LoginBody = ({title, sender}) => {    
    return (
        <Grid container
        direction="row"
        spacing={40}>
            <Grid item xs={2}   >                
            </Grid>
            <Grid item xs={4}   >
                <LoginForm title={title} sender={sender}/>
            </Grid>
            <Grid item xs={4} 
             justify="center"
             alignContent="center">
                <img  src={logo} alt='logo' style={{"padding-top": "100px"}} /> 
            </Grid>
            <Grid item xs={2} justify="center">                
            </Grid>
        </Grid>
    ) 
}

export default LoginBody;