import React from 'react';
import {Grid} from '@material-ui/core';
import LoginSignupTopBar from '../../helpers/LoginSignupTopBar';
import LoginBody from '../../helpers/LoginBody.jsx';

export default function LoginRestaurant(){
    let propinfo = {
        logintitle : "Log In to Yelp Business",
        sender : "biz"
    }    
    return (    
        <Grid container direction="column">
            <Grid item >
                <LoginSignupTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                <LoginBody title={propinfo.logintitle} sender={propinfo.sender} />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}