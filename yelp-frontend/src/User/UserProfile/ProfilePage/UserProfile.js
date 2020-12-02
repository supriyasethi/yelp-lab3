import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import UserInfo from "./UserInfo.jsx";
import UserDetails from "./UserDetails.jsx";
import { connect, useDispatch } from "react-redux";
import LoginSignupTopBar from "../../../helpers/LoginSignupTopBar.jsx";
import { useHistory } from "react-router-dom";
import { updateUserProfile } from "../../../js/actionconstants/action-types";
import { getUserProfile } from "../../../js/actions/userActions";
import axios from "axios";
import serverUrl from "../../../config.js";

function UserProfile() {
	const dispatch = useDispatch();
	let history = useHistory();
	if (!localStorage.getItem("token")) {
		history.push("/home");
	}

	useEffect(() => {
		var userId = localStorage.getItem("user_id");

		axios.defaults.withCredentials = true;
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		axios
			.get(serverUrl + "get/userp", {
				params: {
					userId: userId,
				},
			})
			.then((response) => {
				console.log('response', response);
				if (response.status === 200) {
					console.log("response", response.data);
					//update the state with the response data
					let payload = {
						Firstname:response.data.firstname,
						Lastname: response.data.lastname,
						Dateofbirth: response.data.dateofbirth,
						City: response.data.city,
						State: response.data.state,
						Country: response.data.country,
						Nickname: response.data.nickname,
						Gender: response.data.gender,
						Emailid: response.data.emailid,
						Phonenumber: response.data.phonenumber,
						Yelpingsince: response.data.yelpingsince,
						Thingsilove: response.data.thingilove,
						Findmein: response.data.findmein,
						Orders: response.data.orders,
						Reviews: response.data.reviews,
						Events: response.data.events,
					};
					localStorage.setItem('user_firstname',response.data.firstname );
					localStorage.setItem('user_lastname',response.data.lastname );
					localStorage.setItem('user_city',response.data.city );
					localStorage.setItem('user_state',response.data.state);
					localStorage.setItem('user_yelpingsince',response.data.yelpingsince );
					localStorage.setItem('user_thingsilove',response.data.thingsilove );					
					console.log('user payload', payload);
					dispatch(getUserProfile(payload));
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<Grid container direction='column' spacing={50}>
			<Grid item>
				<LoginSignupTopBar />
			</Grid>
			<Grid item container>
				<Grid xs={0} sm={2} />
				<Grid xs={12} sm={8}>
					<UserInfo />
				</Grid>
				<Grid xs={0} sm={2} />
			</Grid>
			<Grid item container>
				<Grid xs={0} sm={2} />
				<Grid xs={12} sm={8}>
					<UserDetails />
				</Grid>
				<Grid xs={0} sm={2} />
			</Grid>
		</Grid>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUserProfile: (payload) => {
			dispatch(
				getUserProfile({
					type: updateUserProfile,
					payload,
				})
			);
		},
	};
};

export default connect(null, mapDispatchToProps)(UserProfile);
//export default Profile;
