import React, {useEffect} from 'react';
import TopBar from '../TopBar/TopBar';
import {Divider, Grid} from '@material-ui/core';
import Body from './Body'
import Menu from './Menu'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import LoginSignupTopBar from '../../helpers/LoginSignupTopBar';
import { updateRestaurantProfile } from "../../js/actionconstants/action-types";
import { getProfile } from "../../js/actions/restaurantActions";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import serverUrl from "../../config.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',  
    justifyContent: 'center',
    },
    
}));

function ProfileU(){  
    let history = useHistory();  
    const dispatch = useDispatch();
   const classes = useStyles(); 
   if(!localStorage.getItem('token')){
	history.push('/home');
    }

    useEffect(() => {
		var restaurantId = localStorage.getItem("restaurant_id");
		console.log('restaurantId',restaurantId);

		axios.defaults.withCredentials = true;
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		axios
			.get(serverUrl + "get/bizp", {
				params: {
					restaurantId: restaurantId,
				},
			})
			.then((response) => {
				if (response.status === 200) {					
					let payload = {
						Name: response.data.name,
						City: response.data.city,
						Description: response.data.description,
						Address: response.data.address,
						Timing: response.data.timing,
						Emailid: response.data.emailid,
						Website: response.data.website,
						Phonenumber: response.data.phonenumber,
						Menu: response.data.menu,
						Orders: response.data.orders,
						Reviews: response.data.reviews,
						Events: response.data.events,
					};		
					localStorage.setItem('RestaurantMenu', JSON.stringify(response.data.menu));			
					dispatch(
						getProfile(payload)
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
    return (
      <div className={classes.root}>
      <Grid container direction="column">
            <Grid item >
                <LoginSignupTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={1}/>
                <Grid xs={12} sm={10}>
                <Body />
                </Grid>
                <Grid xs={0} sm={1}/>
            </Grid>
            <Grid item container justify="center">
                <Grid xs={0} sm={1}/>
                <Grid xs={12} sm={10}>
                <Menu />
                </Grid>
                <Grid xs={0} sm={1}/>
            </Grid>
        </Grid>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
	return {
		getProfile: (payload) => {
			dispatch(
				getProfile({
					type: updateRestaurantProfile,
					payload,
				})
			);
		},
	};
};

export default connect(null, mapDispatchToProps)(ProfileU);