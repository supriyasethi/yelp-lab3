import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import MessageIcon from '@material-ui/icons/Message';
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import serverUrl from "../../../config.js";
import { connect } from "react-redux";

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
	listItemText: {
		fontSize: "14px",
		fontWeight: "bold",
	},
}));

export default function UserDetails() {
		
	const classes = useStyles();
	let history = useHistory();
	let [username, setUsername] = useState("");
	let [location, setlocation] = useState("");
	let [yelpingsince, setyelpingsince] = useState("");
	let [thingsilove, setthingsilove] = useState("");

	function handleClickProfile() {
		history.push("/userp");
	}

	function handleClickReviews() {
		history.push("/bizlist");
	}

	function handleClickEvents() {
		history.push("/eventsdisplay");
	}

	function handleClickUsers() {
		history.push("/userlist");
	}

	function handleClickOrders() {
		history.push("/vieworder");
	}

	function handleClickMessages() {
		history.push("/usermessages");
	}
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		let firstname =	localStorage.getItem('user_firstname');
		let lastname = localStorage.getItem('user_lastname');
		let city = localStorage.getItem('user_city' );
		let state  = localStorage.getItem('user_state');
		setUsername(firstname + ' ' + lastname);
		setlocation(city + ', ' +state);
		setyelpingsince(localStorage.getItem('user_yelpingsince'));
		setthingsilove(localStorage.getItem('user_thingsilove'));
		// axios
		// 	.get(serverUrl + "get/userp", {
		// 		params: {
		// 			userId: userId,
		// 		},
		// 	})
		// 	.then((response) => {
		// 		//    update the state with the response data
		// 		console.log(response);
		// 		setUsername(
		// 			response.data[0].first_name + " " + response.data[0].last_name
		// 		);
		// 		setlocation(response.data[0].city + ", " + response.data[0].state);
		// 		setyelpingsince(response.data[0].yelping_since);
		// 		setthingsilove(response.data[0].things_i_love);
		// 	});
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.itemlist}>
				<List>
					<Divider variant='inset' component='li' style={{ width: "150px" }} />
					<ListItem button>
						<ListItemIcon>
							<HomeOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							primary='Profile Overview'
							classes={{ primary: classes.listItemText }}
							onClick={handleClickProfile}
						/>
					</ListItem>
					<Divider variant='inset' component='li' style={{ width: "150px" }} />
					<ListItem button>
						<ListItemIcon>
							<EventIcon />
						</ListItemIcon>
						<ListItemText
							primary='Events'
							classes={{ primary: classes.listItemText }}
							onClick={handleClickEvents}
						/>
					</ListItem>
					<Divider variant='inset' component='li' style={{ width: "150px" }} />
					<ListItem button>
						<ListItemIcon>
							<StarOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							primary='Reviews'
							classes={{ primary: classes.listItemText }}
							onClick={handleClickReviews}
						/>
					</ListItem>
					<Divider variant='inset' component='li' style={{ width: "150px" }} />
					<ListItem button>
						<ListItemIcon>
							<ListAltOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							primary='Orders'
							classes={{ primary: classes.listItemText }}
							onClick={handleClickOrders}
						/>
					</ListItem>
					<Divider variant='inset' component='li' style={{ width: "150px" }} />
					<ListItem button>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText
							primary='Users'
							classes={{ primary: classes.listItemText }}
							onClick={handleClickUsers}
						/>
					</ListItem>
					<Divider variant='inset' component='li' style={{ width: "150px" }} />
					<ListItem button>
						<ListItemIcon>
							<MessageIcon />
						</ListItemIcon>
						<ListItemText
							primary='Messages'
							classes={{ primary: classes.listItemText }}
							onClick={handleClickMessages}
						/>
					</ListItem>
					<Divider variant='inset' component='li' style={{ width: "150px" }} />
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
					About {username}{" "}
				</Typography>
				<Typography
					style={{
						color: "primary",
						fontWeight: "bold",
						fontSize: "14px",
					}}>
					Location{" "}
				</Typography>
				{location}
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
