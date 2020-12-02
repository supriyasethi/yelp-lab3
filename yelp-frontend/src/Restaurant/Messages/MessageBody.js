import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import serverUrl from "../../config.js";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "36ch",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
	messageArea: {
		height: "70vh",
		overflowY: "auto",
	},
}));

function MessageBody(props) {
	let [textMessage, setTextMessage] = useState("");
	let [messagedisplay, setMessageDisplay] = useState([]);
	let messageInfo = props.messageStore.messageList;
	//let messageInfo = localStorage.getItem("messagedata");
	let messages_data = messageInfo;
	console.log(messages_data);
	const classes = useStyles();

	// useEffect(() => {
	// 	let messageInfo = localStorage.getItem("messagedata");
	// 	let messages_data = messageInfo;
	// 	console.log(messages_data);
	// }, []);

	function handleClick(id) {
		for (var i = 0; i < messages_data.length; i++) {
			if (messages_data[i].id === id) {
				console.log("inside if");
				setMessageDisplay(messages_data[i].messages);
				localStorage.setItem("messageId", messages_data[i].id);
				localStorage.setItem("uid", messages_data[i].userid);
				localStorage.setItem("user", messages_data[i].user);
				localStorage.setItem("resid", messages_data[i].restaurantid);
				localStorage.setItem("res", messages_data[i].restaurant);
			}
		}
	}

	function handleTextClick() {
		console.log("inside handle click");
		axios.defaults.withCredentials = true;
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		let msg = {
			message: textMessage,
			role: localStorage.getItem("res"),
		};
		let msgInfo = {
			messageid: localStorage.getItem("messageId"),
			userid: localStorage.getItem("uid"),
			user: localStorage.getItem("user"),
			restaurantid: localStorage.getItem("resid"),
			restauarnt: localStorage.getItem("res"),
			messages: msg,
		};
		axios
			.post(serverUrl + "insert/messages", msgInfo)
			.then((response) => {
				console.log("response", response);
				if (response.status === 200) {
					//update the state with the response data
					console.log("response", response);
					setMessageDisplay((messagedisplay) => [...messagedisplay, msg]);
					setTextMessage("");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<Paper style={{ margin: 16, padding: 16 }}>
			<Grid container direction='row'>
				<Grid xs={12} sm={3}>
					<List className={classes.root}>
						{/* {messages_data.map((listitem) => ( */}
							{props.messageStore.messageList.map((listitem) => (
							<div>
								<ListItem alignItems='flex-start' key={listitem.id}>
								{/* <ListItem alignItems='flex-start'> */}
									<ListItemAvatar>
										<Avatar
											alt='Remy Sharp'
											src='/static/images/avatar/1.jpg'
										/>
									</ListItemAvatar>
									<ListItemText
										button
										primary='user'
										primary={listitem.user}
										onClick={() => handleClick(listitem.id)}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
							</div>
						))} 
					</List>
				</Grid>

				<Grid item xs={9}>
				{messagedisplay ? (
					<List className={classes.messageArea}>
						{messagedisplay.map((listitem) => ( 
						<ListItem key={listitem._id}>
						{/* <ListItem> */}
							<Grid container>
								<Grid item xs={12}>
									<ListItemText align='right' 
										primary={listitem.message}>
									</ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText
										align='right'										
										 secondary={listitem.role}>
										</ListItemText>
								</Grid>
							</Grid>
						</ListItem>
						))}
						</List>		
				) : <p>No Messages Found</p>}
					<Divider />
					<Grid container style={{ padding: "20px" }}>
						<Grid item xs={11}>
							<TextField
								id='outlined-basic-email'
								label='Type Something'
								fullWidth
								type='text'
								value={textMessage}
								onChange={(e) => setTextMessage(e.target.value)}
							/>
						</Grid>
						<Grid xs={1} align='right'>
							<Button
								variant='contained'
								color='secondary'
								style={{
									height: "40px",
									width: "40px",
									fontSize: "12px",
									background: "#d32323",
								}}
								onClick={handleTextClick}>
								<SendIcon />
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

const mapStateToProps = (state) => {	
	const {messageStore} = state.messagesReducer;	
	return {
		messageStore		
	};
};
export default connect(mapStateToProps, null)(MessageBody);
//export default MessageBody;
