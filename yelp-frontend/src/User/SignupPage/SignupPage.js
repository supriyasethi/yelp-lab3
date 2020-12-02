import React from 'react';
import {Grid} from '@material-ui/core';
import LoginSignupTopBar from '../../helpers/LoginSignupTopBar';
import SignupBody from './SignupBody.jsx';
import { useHistory } from 'react-router-dom';

export default function SignupPage(){
    let history = useHistory(); 
    if(!localStorage.getItem('token')){
		history.push('/home');
	}
    return (    
        <Grid container direction="column">
            <Grid item >
                <LoginSignupTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                <SignupBody />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}