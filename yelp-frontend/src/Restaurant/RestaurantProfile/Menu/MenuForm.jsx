import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, TextField } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
//import ImageUploader from 'react-images-upload';
import { useHistory } from "react-router-dom";
//import { serverUrl } from "../../../config.js";
import { updateRestaurantProfile } from "../../../js/actionconstants/action-types";
import { getProfile } from "../../../js/actions/restaurantActions";
import serverUrl from "../../../config";
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

const INSERT_MENU = gql`
	mutation insertMenu(
		$resId: String
		$dishname: String
		$ingredients: String
		$price: String
		$description: String
		$category: String
	) {
		insertMenu(
			menuInput: {
				resId: $resId
				dishname: $dishname
				ingredients: $ingredients
				price: $price
				description: $description
				category: $category
			}
		) {
			statuscode
		}
	}
`;

function MenuForm() {
	const dispatch = useDispatch();
	const [picture, setpicture] = useState(
		"https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"
	);
	const [state, setState] = React.useState({
		dishname: "",
		ingredients: "",
		price: null,
		description: "",
		category: "",
		resId: "",
	});

	let history = useHistory();
	const classes = useStyles();
	const resId = localStorage.getItem("restaurant_id");
	const [createMenu, { error, data }] = useMutation(INSERT_MENU);

	function handleChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
			resId: resId,
		});
	}

	const handleSaveChanges = (e) => {
		console.log("inside handle save changes");
		createMenu({
			variables: {
				resId: state.resId,
				dishname: state.dishname,
				ingredients: state.ingredients,
				price: state.price,
				description: state.description,
				category: state.category,
			},
		});
		console.log(data);
		if (data) {
			let payload = {
				Menu: {
					dishname: state.dishname,
					ingredients: state.ingredients,
					price: state.price,
					description: state.description,
					category: state.category,
				},
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
		// 	.post(serverUrl + "/insert/menu", state)
		// 	.then((response) => {
		// 		console.log("Status code: ", response.status);
		// 		if (response.status === 200) {
		// 			let payload = {
		// 				restaurant: {
		// 					Menu: response.data,
		// 				},
		// 			};
		// 			dispatch(getProfile(payload));
		// 			history.push("/bizp");
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log("error", error.response);
		// 	});
	};

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
					Add Dishes for your Menu
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
					Your Dish Photo
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
					Dish name
				</Typography>
				<TextField
					id='outlined-basic'
					variant='outlined'
					size='small'
					type='text'
					margin='dense'
					style={{ height: "20", width: "500px" }}
					name='dishname'
					value={state.dishname}
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
						Ingredients
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='ingredients'
						value={state.ingredients}
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
						Price
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='price'
						value={state.price}
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
						Category
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='category'
						value={state.category}
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
						onClick={(event) => handleSaveChanges(event)}>
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
//     return {
//         firstname: state.profile.firstname,
//         zipcode :  state.profile.zipcode
//     }
//   }

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
export default connect(null, mapDispatchToProps)(MenuForm);
//export default connect(mapStateToProps, null)(UserInfo);
//export default MenuForm;
