import React, { useState, useEffect } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/homepage1.jpg";

const useStyles = makeStyles(() => ({
	container: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "space-between",
		width: "120.4%",
		padding: "20",
	},

	profile: {
		flexGrow: "0",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		margin: "5px",
	},
	user: {
		flexGrow: "3",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		marginTop: "80px",
	},

	update: {
		flexGrow: "0",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		marginTop: "80px",
	},
}));

function UserInfo(props) {

	let [profilepic, setProfilePic] = useState('');
	let history = useHistory();

	//let userInfo = userData.userData;

	const classes = useStyles();

	function handleUpdateProfile() {
		history.push("/updateuprofile");
	}

	return (
		<div className={classes.container}>
			<div className={classes.profile} style={{ display: "inline-block" }}>
				<Avatar
					variant='square'
					src={logo}
					style={{
						margin: "10px",
						width: "220px",
						height: "220px",
					}}
				/>
			</div>
			<div className={classes.user}>
				<Typography
					style={{
						color: "#333333",
						fontWeight: "bold",
						fontSize: "29px",
					}}>
					{props.userStore.Firstname} {props.userStore.Lastname}
				</Typography>
				<Typography
					style={{
						color: "#333333",
						fontSize: "15px",
					}}>
					{props.userStore.City}, {props.userStore.Country}
				</Typography>
			</div>
			<div>
				<Divider orientation='vertical' />
			</div>
			<div className={classes.update}>
				<Button
					onClick={handleUpdateProfile}
					color='secondary'
					style={{
						color: "#333333",
						"font-size": "12px",
						"font-weight": "bold",
					}}>
					Update Your Profile
				</Button>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log('state', state);
	const {userStore} = state.userReducer;
	return {
		userStore,
	};
};

export default connect(mapStateToProps, null)(UserInfo);
//export default UserInfo;
