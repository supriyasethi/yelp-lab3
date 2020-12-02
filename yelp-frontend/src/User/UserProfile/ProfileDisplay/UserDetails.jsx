import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "space-between",
		width: "122%",
		padding: "5",
	},
	itemlist: {
		flexGrow: "0",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)" /* separate properties for IE11 upport */,
		margin: "5px",
	},
	itemtext: {
		flexGrow: "3",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)" /* separate properties for IE11 upport */,
		margin: "5px",
	},
	itemabout: {
		flexDirection: "row",
		flexGrow: "0",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)" /* separate properties for IE11 upport */,
		margin: "5px",
	},
}));

function UserDetails(userData) {
	let firstname = localStorage.getItem("u_firstname");
	let lastname = localStorage.getItem("u_lastname");
	let city = localStorage.getItem("u_city");
	let state = localStorage.getItem("u_state");
	let yelpingsince = localStorage.getItem("u_yelpingsince");
	let thingsilove = localStorage.getItem("u_thingsilove");
	let findmein = localStorage.getItem("u_findmein");
	//let userDetails = userData.userData;
	//console.log("user details", userDetails);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.itemlist}>
				<List>
					<Divider variant='inset' component='li' />
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<ImageIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Profile Overview' />
					</ListItem>
					<Divider variant='inset' component='li' />
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<WorkIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Friends' />
					</ListItem>
					<Divider variant='inset' component='li' />
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<BeachAccessIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Reviews' />
					</ListItem>
				</List>
			</div>
			<div className={classes.itemtext}>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "21px",
					}}>
					Recent Activity
				</Typography>
				<Divider />
			</div>
			<div>
				<Divider orientation='vertical' />
			</div>
			<div className={classes.itemabout}>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "14px",
					}}>
					About {firstname} {lastname}{" "}
				</Typography>
				<Typography
					style={{
						color: "primary",
						fontWeight: "bold",
						fontSize: "14px",
					}}>
					Location{" "}
				</Typography>
				{city}, {state}
				<Typography
					style={{
						color: "primary",
						fontWeight: "bold",
						fontSize: "14px",
					}}>
					Yelping Since{" "}
				</Typography>
				{yelpingsince}
				<Typography
					style={{
						color: "primary",
						fontWeight: "bold",
						fontSize: "14px",
					}}>
					Things I Love{" "}
				</Typography>
				{thingsilove}
			</div>
		</div>
	);
}

// const mapStateToProps = (state) => {
// 	const userData = state.userReducer.user;
// 	return {
// 		userData,
// 	};
// };

// export default connect(mapStateToProps, null)(UserDetails);
export default UserDetails;
