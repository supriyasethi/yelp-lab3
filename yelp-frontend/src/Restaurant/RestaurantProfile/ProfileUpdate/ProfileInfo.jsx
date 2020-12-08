import React, { useState } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, TextField } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router-dom";
import serverUrl from "../../../config.js";
import { updateRestaurantProfile } from "../../../js/actionconstants/action-types";
import { getProfile } from "../../../js/actions/restaurantActions";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

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

const UPDATE_PROFILE = gql`
	mutation updateBiz(
		$restaurantId: String
		$name: String
		$description: String
		$address: String
		$timing: String
		$website: String
		$phonenumber: String
	) {
		updateBiz(
			updateBizInput: {
				restaurantId: $restaurantId
				name: $name
				description: $description
				address: $address
				timing: $timing
				website: $website
				phonenumber: $phonenumber
			}
		) {
			statuscode
		}
	}
`;

function ProfileInfo(props) {
	const dispatch = useDispatch();
	//let restaurantInfo = restaurantData.restaurantData.restaurant;

	const [picture, setpicture] = useState(
		"https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"
	);
	const [state, setState] = React.useState({
		name: props.restaurantStore.Name,
		description: props.restaurantStore.Description,
		address: props.restaurantStore.Address,
		phonenumber: props.restaurantStore.Phonenumber,
		timing: props.restaurantStore.Timing,
		website: props.restaurantStore.Website,
		restaurantId: null,
	});
	const [updateprofile, { error, data }] = useMutation(UPDATE_PROFILE);
	let history = useHistory();
	const classes = useStyles();

	function handleFileSelected(e) {
		setpicture(URL.createObjectURL(e.target.files[0]));
	}
	const res = localStorage.getItem("restaurant_id");
	function handleChange(e) {
		
		console.log("handlechange state", state);
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
			restaurantId: res,
		});
	}

	function handleSaveChanges() {
		let profileInfo = {
			state,
			picture,
		};
		console.log("state in profilinfo", state);
		updateprofile({
			variables: {
				restaurantId: res,
				name: state.name,
				description: state.description,
				address: state.address,
				timing: state.timing,
				website: state.website,
				phonenumber: state.phonenumber,
			},
		});

		console.log(data);
		if (data) {
			let payload = {
				Name: state.name,
				Description: state.description,
				Address: state.address,
				Phonenumber: state.phonenumber,
				Timing: state.timing,
				Website: state.website,
			};
			dispatch(getProfile(payload));
			//			e.preventDefault();
			history.push("/bizp");
		}
		if (error) {
			console.log("error", error.response);
		}
		// axios.defaults.withCredentials = true;
		// axios
		// 	.post(serverUrl + "update/bizprofile", state)
		// 	.then((response) => {
		// 		console.log("Status code: ", response.status);
		// 		if (response.status === 200) {
		// 			let payload = {
		// 				Name: state.name,
		// 				Description: state.description,
		// 				Address: state.address,
		// 				Phonenumber: state.phonenumber,
		// 				Timing: state.timing,
		// 				Website: state.website,
		// 			};
		// 			// restaurantInfo.Name = state.name;
		// 			// restaurantInfo.Description = state.description;
		// 			// restaurantInfo.Address = state.address;
		// 			// restaurantInfo.Phonenumber = state.phonenumber;
		// 			// restaurantInfo.Timing = state.timing;
		// 			// restaurantInfo.Website = state.website;
		// 			//let payload = restaurantInfo;
		// 			dispatch(getProfile(payload));
		// 			//updateRestaurantProfile(payload);
		// 			history.push("/bizp");
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log("error", error);
		// 	});
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
					Update Business Information
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
					Your Profile Photo
					<input type='file' onChange={handleFileSelected} />
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
					Restaurant Name
				</Typography>
				<TextField
					id='outlined-basic'
					variant='outlined'
					size='small'
					type='text'
					margin='dense'
					style={{ height: "20", width: "500px" }}
					name='name'
					value={state.name}
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
						Address
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='address'
						value={state.address}
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
						Phone Number
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='phonenumber'
						value={state.phonenumber}
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
						Timing
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='timing'
						value={state.timing}
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
						Website
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='website'
						value={state.website}
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

const mapStateToProps = (state) => {
	const { restaurantStore } = state.restaurant;
	//const restaurantData = state.restaurant;
	return {
		restaurantStore,
	};
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
		// updateRestaurantProfile: (payload) => {
		// 	dispatch({
		// 		type: updateRestaurantProfile,
		// 		payload,
		// 	});
		// },
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
//export default ProfileInfo;
