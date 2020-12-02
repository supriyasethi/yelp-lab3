import React, { useRef } from "react";
import styles from "./Searchbar.module.css";
import axios from "axios";
import {
	Button,
	TextField,
	Typography,
	Divider,
	Avatar,
	Link,
} from "@material-ui/core";
import logo from "../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import cookie from "react-cookies";
import serverUrl from "../config.js";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,
	},
	inline: {
		display: "inline",
	},
	list: {
		marginTop: 300,
	},
	mapStyles: {
		width: "100%",
		height: "100%",
	},
}));

export function Searchbar() {
	let history = useHistory();
	const mapRef = useRef(null);
	const classes = useStyles();
	let rows = [];

	let [state, setState] = React.useState({
		find: "",
		where: "",
		restaurants: [],
		header: "",
	});

	function handleFindChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
		});
	}

	var newRestaurant = [];
	let issearch = 0;

	function handleSearch() {
		axios
			.get(serverUrl + "get/home", {
				params: {
					keyword: state.find,
					location: state.where,
				},
			})
			.then((response) => {
				console.log("Status code: ", response.status);
				if (response.status === 200) {
					console.log(response);
					if (response.data.length > 0) {
						newRestaurant = response.data;
						console.log("newRestaurant", newRestaurant);
						setState({
							restaurants: newRestaurant,
							header: (
								<Typography
									style={{
										color: "#d32323",
										fontWeight: "bold",
										fontSize: "18px",
									}}
									component='span'
									variant='body2'
									className={classes.inline}
									color='textPrimary'>
									Restaurants List
								</Typography>
							),
						});
						console.log("restaurants", state.restaurants);
					}
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	function handleOrderRequest(e, id) {
		console.log('id', id);
		localStorage.setItem("restaurant_id", id);
		if (cookie.load("cookie")) {
			history.push("/bizdisplay");
		} else history.push("/login/user");
	}

	return (
		<div>
			<div className='field has-addons'>
				<p className='control'>
					<a href className='button is-static is-medium'>
						Find
					</a>
				</p>
				<p className='control'>
					<TextField
						className={`input is-medium ${styles["input"]}`}
						id='outlined-basic'
						placeholder='Restaurants'
						variant='outlined'
						size='medium'
						type='text'
						name='find'
						value={state.find}
						onChange={handleFindChange}
					/>
				</p>
				<p className='control'>
					<a href className='button is-static is-medium'>
						Near
					</a>
				</p>
				<p className='control'>
					<TextField
						className={`input is-medium ${styles["input"]}`}
						id='outlined-basic'
						placeholder='Where'
						variant='outlined'
						size='medium'
						type='text'
						name='where'
						value={state.where}
						onChange={handleFindChange}
					/>
				</p>
				<div>
					<Button
						variant='contained'
						color='secondary'
						style={{
							height: "50px",
							width: "20px",
							background: "#d32323",
							fontWeight: "bold",
						}}
						onClick={handleSearch}>
						{" "}
						Search{" "}
					</Button>
				</div>
			</div>
			<div className={classes.list}>
				<div>{state.header}
				<List>
					
					{state.restaurants.map((listitem) => (						
						<ListItem alignItems='flex-start' key={listitem._id}>
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
												DishName:
											</Typography>
											{listitem.dishName}
										</div>
										<div>
											<Typography
												component='span'
												variant='body2'
												className={classes.inline}
												color='textPrimary'>
												Price:$
											</Typography>
											{listitem.price}
										</div>
										<div>
											<Link
												component='button'
												variant='body2'
												style={{
													fontSize: "14px",
													fontWeight: "bold",
												}}
												onClick={(event) =>
													handleOrderRequest(event, listitem.restauarantid)
												}>
												Order Online
											</Link>
										</div>
									</React.Fragment>
								}
							/>
						</ListItem>
					))}
				</List>
				</div>
				<Divider />
			</div>
		</div>
	);
}

// GeoDistanceFrom.propTypes = {
// 	google: PropTypes.shape({}).isRequired,
//   };

// GeoDistanceFrom.defaultProps = {
// };
// export default GoogleApiWrapper({
// 	apiKey: 'AIzaSyAy94PUn8Y_lBS8hk555rkc19tntZ5GX4w',
// 	libraries: ['places']
//   })(Searchbar);
