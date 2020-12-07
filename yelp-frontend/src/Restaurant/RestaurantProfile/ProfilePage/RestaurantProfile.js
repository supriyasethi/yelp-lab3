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
//import { graphql } from 'react-apollo';
//import {fetchProfile} from '../../../graphql/queries';
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import axios from "axios";
import serverUrl from "../../../config.js";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
}));

const fetchProfile = gql`
	query fetchBiz($restaurantId: String) {
		fetchBiz(restaurantId: $restaurantId) {
			_id
			name
			city
			description
			address
			timing
			emailid
			website
			phonenumber
			menu {
				_id
				dishname
				ingredients
				price
				description
				category
			}
			orders {
				_id
				userid
				username
				orderitem
				delieveryoption
				delieverystatus
				orderstatus
			}
			reviews {
				_id
				userid
				username
				review
				rating
			}
		}
	}
`;
const RestaurantProfile = () => {
	
	const dispatch = useDispatch();
	let response = "";
	let [restaurantName, setRestaurantname] = useState();

	let history = useHistory();
	if (!localStorage.getItem("token")) {
		history.push("/home");
	}
	const classes = useStyles();
	var restaurantid = localStorage.getItem("restaurant_id");
	const { loading, error, data } = useQuery(fetchProfile, {
		variables: { restaurantId: restaurantid },
	});
	
	if (loading) return <p>Loading ...</p>;
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log("data", data);
		let payload = {
			Name: data.fetchBiz.name,
			City: data.fetchBiz.city,
			Description: data.fetchBiz.description,
			Address: data.fetchBiz.address,
			Timing: data.fetchBiz.timing,
			Emailid: data.fetchBiz.emailid,
			Website: data.fetchBiz.website,
			Phonenumber: data.fetchBiz.phonenumber,
			Menu: data.fetchBiz.menu,
			Orders: data.fetchBiz.orders,
			Reviews: data.fetchBiz.reviews,
			Events: data.fetchBiz.events,
		};
		dispatch(getProfile(payload));
	}
	
// 	useEffect(() => {
	
// 		//localStorage.setItem('RestaurantMenu', JSON.stringify(response.data.menu));
		
// 		//updateRestaurantProfile(payload);
// 		setRestaurantname(data.fetchBiz.name);
	
// },[data])

	//useEffect(() => {

	// axios.defaults.withCredentials = true;
	// axios.defaults.headers.common["authorization"] = localStorage.getItem(
	// 	"token"
	// );
	// axios
	// 	.get(serverUrl + "get/bizp", {
	// 		params: {
	// 			restaurantId: restaurantId,
	// 		},
	// 	})
	// 	.then((response) => {
	// 		if (response.status === 200) {
	// 			console.log("response", response.data);
	// 			//update the state with the response data
	// 			payload = {
	// 				Name: response.data.name,
	// 				City: response.data.city,
	// 				Description: response.data.description,
	// 				Address: response.data.address,
	// 				Timing: response.data.timing,
	// 				Emailid: response.data.emailid,
	// 				Website: response.data.website,
	// 				Phonenumber: response.data.phonenumber,
	// 				Menu: response.data.menu,
	// 				Orders: response.data.orders,
	// 				Reviews: response.data.reviews,
	// 				Events: response.data.events,
	// 			};
	// 			//localStorage.setItem('RestaurantMenu', JSON.stringify(response.data.menu));
	// 			dispatch(getProfile(payload));
	// 			//updateRestaurantProfile(payload);
	// 			setRestaurantname(response.data.name);
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	});
	//}, []);

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
export { fetchProfile };
