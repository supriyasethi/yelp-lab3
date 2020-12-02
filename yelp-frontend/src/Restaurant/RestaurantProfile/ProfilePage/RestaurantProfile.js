import React, { useEffect, useState } from "react";
import TopBar from "../../TopBar/TopBar";
import { Divider, Grid } from "@material-ui/core";
import ProfileBody from "./ProfileBody";
import "react-chat-widget/lib/styles.css";
import RestaurantMenu from "./RestaurantMenu";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { updateRestaurantProfile } from "../../../js/actionconstants/action-types";
import { getProfile } from "../../../js/actions/restaurantActions";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import serverUrl from "../../../config.js";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
}));

const RestaurantProfile = () => {
	let payload = "";
	const dispatch = useDispatch();
	let response = "";
	let [restaurantName, setRestaurantname] = useState();

	let history = useHistory();
	if (!localStorage.getItem("token")) {
		history.push("/home");
	}
	const classes = useStyles();
	useEffect(() => {
		var restaurantId = localStorage.getItem("restaurant_id");

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
					console.log("response", response.data);
					//update the state with the response data
					payload = {
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
					//localStorage.setItem('RestaurantMenu', JSON.stringify(response.data.menu));
					dispatch(getProfile(payload));
					//updateRestaurantProfile(payload);
					setRestaurantname(response.data.name);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className={classes.root}>
			<Grid container direction='column'>
				<Grid item>
					<TopBar />
				</Grid>
				<Grid item container>
					<Grid xs={0} sm={1} />
					<Grid xs={12} sm={10}>
						<ProfileBody />
					</Grid>
					<Grid xs={0} sm={1} />
				</Grid>
			</Grid>
		</div>
	);
};

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

export default connect(null, mapDispatchToProps)(RestaurantProfile);
