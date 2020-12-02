import React from 'react';
import {Grid} from '@material-ui/core';
import Links from './Links';
import Info from './Info';


const Body = () => {
    
    return (
        <Grid container
        direction="row"
        spacing={40}>
            <Grid xs={0} sm={1} justify="center"/>
            <Grid item xs={2} justify="center">
                <Links />
            </Grid>
            <Grid item xs={8} 
             alignItems="flex-start" justify="flex-end">
               <Info/>
            </Grid>   
            <Grid xs={0} sm={1}/>  
                   
        </Grid>
    ) 
}

export default Body;