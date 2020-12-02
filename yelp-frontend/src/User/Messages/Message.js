import React, { useEffect, useState } from "react";
import LoginSignupTopBar from "../../helpers/LoginSignupTopBar";
import { Divider, Grid } from "@material-ui/core";
import MessageBody from "./MessageBody";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../config.js";
import { updateMessageList } from "../../js/actionconstants/action-types";
import { updateMessages } from "../../js/actions/restaurantActions";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
}));

const Message = () => {	

	const dispatch = useDispatch();
	let payload = '';
	let history = useHistory();
	if (!localStorage.getItem("token")) {
		history.push("/home");
	}
	const classes = useStyles();
	useEffect(() => {
		axios.defaults.withCredentials = true;
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		axios
			.get(serverUrl + "get/messages", {
				params: {
					userId: localStorage.getItem('user_id')
				}
			})
			.then((response) => {
				console.log("response", response);
				if (response.status === 200) {
					console.log("response", response.data.length);
					payload = JSON.parse(response.data);
					dispatch(updateMessages(payload));
					localStorage.setItem("messagedata", (response.data));
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
					<LoginSignupTopBar />
				</Grid>
				<Grid item container>
					<Grid xs={0} sm={1} />
					<Grid xs={12} sm={10}>
						<MessageBody />
					</Grid>
					<Grid xs={0} sm={1} />
				</Grid>
			</Grid>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateMessages: (payload) => {
			dispatch(
				updateMessages({
					type: updateMessageList,
					payload,
				})
			);
		},
	};
};
//export default connect(null, mapDispatchToProps)(Message);
export default Message;
