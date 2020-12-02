import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, TextField } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
//import ImageUploader from 'react-images-upload';
import { useHistory } from "react-router-dom";
import serverUrl from "../../../config";


const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
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

function EventsForm() {
  
	const dispatch = useDispatch();
	const [picture, setpicture] = useState(
		"https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"
	);
	const [state, setState] = React.useState({
		eventname: "",
		description: "",
		time: "",
		date: "",
		location: "",
		hashtag: "",
		resid: "",
	});

	let history = useHistory();
	const classes = useStyles();

	function handleChange(e) {
		const res = localStorage.getItem("restaurant_id");
		console.log("handlechange state", state);
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
			resid: res,
		});
	}

	function handleSaveChanges() {
		console.log("state", state);

		axios.defaults.withCredentials = true;
		axios
			.post(serverUrl + "/insert/event", state)
			.then((response) => {
				console.log("Status code: ", response.status);
				if (response.status === 200) {  					      
					history.push("/bizp");
				}
			})
			.catch((error) => {
				console.log("error", error.response);
			});
	}

	function handleCancel() {
		history.push("/bizp");
	}

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "20px",
						justifyContent: "center",
					}}>
					Add Events
				</Typography>
			</div>
			<div>
				<Divider />
			</div>
			<div>
				<Typography
					style={{
						color: "#333333",
						fontWeight: "bold",
						fontSize: "13px",
						justifyContent: "center",
					}}>
					Your Event Photo
					<input type='file' />
				</Typography>
				<img
					src={picture}
					style={{
						margin: "10px",
						width: "100px",
						height: "100px",
					}}
				/>
			</div>
			<div>
				<Typography
					style={{
						color: "#333333",
						fontWeight: "bold",
						fontSize: "13px",
						justifyContent: "center",
					}}>
					Event name
				</Typography>
				<TextField
					id='outlined-basic'
					variant='outlined'
					size='small'
					type='text'
					margin='dense'
					style={{ height: "20", width: "500px" }}
					name='eventname'
					value={state.eventname}
					onChange={handleChange}
				/>
				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Description
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='description'
						value={state.description}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Time
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='time'
						value={state.time}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Date
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='date'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='date'
						value={state.date}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Location
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='location'
						value={state.location}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Hashtags
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='hashtag'
						value={state.hashtag}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Button
						variant='contained'
						color='secondary'
						style={{
							height: "35px",
							width: "150px",
							fontSize: "12px",
							fontWeight: "bold",
							background: "#d32323",
						}}
						onClick={handleSaveChanges}>
						Save Changes
					</Button>

					<Button
						variant='contained'
						color='secondary'
						style={{
							height: "35px",
							width: "150px",
							fontSize: "12px",
							fontWeight: "bold",
							background: "#333333",
						}}
						onClick={handleCancel}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}

// const mapStateToProps = (state) => {
// 	//const restaurantData = state.restaurant;
// 	const {restaurantStore} = state.restaurant;
// 	return {
// 		restaurantStore
// 		//restaurantData,
// 	};
// };


export default EventsForm;
