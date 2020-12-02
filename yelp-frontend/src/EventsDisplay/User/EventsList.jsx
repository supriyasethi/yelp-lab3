import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Typography,
	Divider,
	Avatar,
	Link,
	Button,
	TextField,
} from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import axios from "axios";
import Cookies from "js-cookie";
import cookie from "react-cookies";
import serverUrl from "../../config.js";
import { updateUserEventList } from "../../js/actionconstants/action-types";
import { getUserEvent } from "../../js/actions/eventsActions";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,
	},
	inline: {
		display: "inline",
	},
	input: {
		width: "200px",
		height: "5px",
	},
}));

function EventsList(props) {
	const dispatch = useDispatch();
	let history = useHistory();	
	let [eventmsg, seteventmsg] = useState();
	let [searchkey, setsearchkey] = useState();
	let [state, setState] = React.useState({
		events: [],
		sortFlag: false,
	});

	useEffect( async () => {
		var newEvent = [];
		axios.defaults.withCredentials = true;
		await axios
			.get(serverUrl + "get/events")
			.then((response) => {
				if (response.status === 200) {
					console.log('response', response.data);					
					// setState({
					// 	authFlag: true,
					// 	events: [...state.events, JSON.parse(response.data)]
					// });
					let payload = {
						eventUserList: response.data
					}
					dispatch(getUserEvent(payload));
				}
				newEvent = state.events;
				console.log("events array", newEvent);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function handleSearchChange(e) {
		setsearchkey(e.target.value);
	}
	function handleSearchEvent() {
		var newEvent = [];
		axios.defaults.withCredentials = true;		
		axios
			.get(serverUrl + "get/eventkey", {
				params: {
					key: searchkey,
				},
			})
			.then((response) => {
				//update the state with the response data
				setState({
					authFlag: true,
					events:  [...state.events, JSON.parse(response.data)]
				});
			});
	}
	function handleRegister(e, id) {
		let userid = localStorage.getItem("user_id");
		let firstname = localStorage.getItem("userfirstname");
		let lastname = localStorage.getItem("userlastname");
		var postInfo = {
			eventid: id,
			firstname: firstname,
			lastname: lastname,
			userid: userid,
		};
		axios.defaults.withCredentials = true;
		axios.post(serverUrl + "insert/userregister", postInfo).then((response) => {
			if (response.status === 200) {
				//console.log(response.data);
				seteventmsg(<p>Event Registered!</p>);
			}
		});
	}

	function handleSortAsc() {
		setState({
			events: state.events.sort((a, b) =>
				a.date
					.split("/")
					.reverse()
					.join()
					.localeCompare(b.date.split("/").reverse().join())
			),
			sortFlag: true,
		});
	}
	function handleSortDesc() {
		setState({
			events: state.events.sort((b, a) =>
				a.date
					.split("/")
					.reverse()
					.join()
					.localeCompare(b.date.split("/").reverse().join())
			),
			sortFlag: true,
		});
	}

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>{eventmsg}</div>
			<div>
				<TextField
					className={`input is-medium ${classes.input}`}
					id='outlined-basic'
					placeholder='Events'
					variant='outlined'
					size='medium'
					type='text'
					name='searchkey'
					value={state.searchkey}
					style={{
						height: "35px",
					}}
					onChange={handleSearchChange}
				/>
				<Button
					variant='contained'
					color='secondary'
					style={{
						height: "55px",
						width: "100px",
						fontSize: "12px",
						fontWeight: "bold",
						background: "#d32323",
					}}
					onClick={handleSearchEvent}>
					Search
				</Button>
			</div>
			<div>
				<Button
					variant='contained'
					color='secondary'
					style={{
						height: "40px",
						width: "100px",
						fontSize: "12px",
						fontWeight: "bold",
						color: "#d32323",
						background: "white",
						borderColor: "#d32323",
						marginTop: "10px",
						marginLeft: "10px",
					}}
					onClick={handleSortAsc}>
					SortbyDate Asc
				</Button>
				<Button
					variant='contained'
					color='secondary'
					style={{
						height: "40px",
						width: "100px",
						fontSize: "12px",
						fontWeight: "bold",
						color: "#d32323",
						background: "white",
						borderColor: "#d32323",
						marginTop: "10px",
						marginLeft: "10px",
					}}
					onClick={handleSortDesc}>
					SortbyDate Desc
				</Button>
			</div>			
			<List>				
				{/* {state.events.map((listitem) => ( */}
				{props.eventUserListStore.eventUserList.map((listitem) => (
					<ListItem alignItems='flex-start' key={listitem._id}>
						<Divider />
						<ListItemAvatar>
							<Avatar alt='Remy Sharp' src={logo} />
						</ListItemAvatar>
						<ListItemText
							primary={listitem.name}
							secondary={
								<React.Fragment>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Timing:
										</Typography>
										{listitem.time}
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Date:
										</Typography>
										{listitem.date}
									</div>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Location:
										</Typography>
										{listitem.location}
									</div>
									<div>
										<Link
											component='button'
											variant='body2'
											style={{
												fontSize: "14px",
												fontWeight: "bold",
											}}
											onClick={(event) => handleRegister(event, listitem._id)}>
											Register
										</Link>
									</div>
								</React.Fragment>
							}
						/>
					</ListItem>
				))}
			</List>			
		</div>
	);
}

const mapStateToProps = (state) => {	
	const {eventUserListStore} = state.eventListReducer;	
	return {
		eventUserListStore	
	};
};
const mapDispatchToProps = (dispatch) => {
	return {			
		getUserEvent: (payload) => {
			dispatch(
				getUserEvent({
					type: updateUserEventList,
					payload,
				})
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);

//export default EventsList;
