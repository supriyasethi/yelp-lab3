import React from 'react';
import {Grid} from '@material-ui/core';
import ListInfo from './ListInfo.jsx';
import TopBar from '../TopBar/TopBar';
import { useHistory } from 'react-router-dom';
//import { connect } from 'react-redux';

 function List(){
    let history = useHistory(); 
    if(!localStorage.getItem('token')){
		history.push('/home');
	}    
    return (    
        <Grid container direction="column" spacing={20}>
            <Grid item >
                <TopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={3}/>
                <Grid xs={12} sm={6}>
                    <ListInfo />
                </Grid>
                <Grid xs={0} sm={3}/>
            </Grid>            
        </Grid>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         users : state.profile.users
//     }
    
// }
//export default connect(mapStateToProps)(Profile);
export default List;

