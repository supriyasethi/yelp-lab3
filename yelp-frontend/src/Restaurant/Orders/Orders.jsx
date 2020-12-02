import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Button, Link } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { updateRestaurantProfile } from "../../js/actionconstants/action-types";
import { getProfile } from "../../js/actions/restaurantActions";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import serverUrl from "../../config.js";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 100,
		marginTop: 20,
		width: "100%",
		maxWidth: 360,
	},
	inline: {
		display: "inline",
	},
	option: {
		marginTop: 20,
		width: "100%",
		maxWidth: 360,
	},

	button: {
		marginLeft: 600,
		marginTop: 20,
		width: "100%",
		maxWidth: 360,
	},
	formControl: {
		margin: 20,
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: 2,
	},
}));

function Orders(props) {
	const dispatch = useDispatch();
	let history = useHistory();

	let [state, setState] = React.useState({
		orders: [],
		delieverystatus: "",
		orderfilter: "",
	});
	//let restaurantOrders = restaurantData.restaurantData.restaurant.Orders;

	//console.log("restaurant orders", restaurantOrders);

	// useEffect(() => {

	// 	var newOrder = [];
	// 	const data = localStorage.getItem("restaurantId");
	// 	console.log("data", data);
	// 	axios.defaults.withCredentials = true;
	// 	//axios.get("http://54.219.75.46:3001/get/orders", {
	// 	axios.get("http://localhost:3001/get/orders", {
	// 			params: {
	// 				restaurantId: data,
	// 			},
	// 		})
	// 		.then((response) => {
	// 			//update the state with the response data
	// 			for (var i = 0; i < response.data.length; i++) {
	// 				var temp = response.data[i];
	// 				newOrder.push({
	// 					id: i,
	// 					items: temp,
	// 				});
	// 			}
	// 			setState({
	// 				orders: newOrder,
	// 			});
	// 		});
	// }, []);

	const classes = useStyles();
	let [msg, setmsg] = useState("");

	const handleChange1 = (value) => {
		console.log("value", value);
		setState({ ...state, delieverystatus: value });
	};

	const handleChange2 = (value) => {
		setState({ ...state, orderfilter: value });
	};
	let resid = localStorage.getItem("restaurant_id");
	function handleOrderUpdate(orderid, userid) {
		let orderInfo = {
			delieverystatus: state.delieverystatus,
			orderfilter: state.orderfilter,
			orderid: orderid,
			resid: resid,
			userid: userid,
		};
		console.log("orderinfo", orderInfo);
		axios.defaults.withCredentials = true;
		//axios.post("http://54.219.75.46:3001/update/order", orderInfo)
		axios
			.post(serverUrl + "update/orders", orderInfo)
			.then((response) => {
				console.log("Status code: ", response);
				if (response.status === 200) {
					setmsg(<p>Order Updated</p>);
					for (var i = 0; i < props.restaurantStore.Orders.length; i++) {
						if (props.restaurantStore.Orders[i]._id === orderid) {
							props.restaurantStore.Orders[i].delieverystatus = state.delieverystatus;
							props.restaurantStore.Orders[i].orderfilter = state.orderfilter;
						}
					}
					let payload = props.restaurantStore.Orders;
					dispatch(getProfile(payload));
					history.push("/bizp");
				}
			})
			.catch((error) => {
				console.log("error", error.response);
				//seterrmsg(<p>Reviews already given by the user</p>)
			});
	}

	function routetoCustomer(e, id) {
		history.push({
			pathname: "/userdisplay",
			state: { data: id },
		});
	}

	return (
		<div className={classes.root}>
			<div>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "20px",
						justifyContent: "center",
					}}>
					Orders
				</Typography>
			</div>
			<div>
				<Divider />
			</div>
			{props.restaurantStore.Orders && (props.restaurantStore.Orders > 0) ? (
			<div className={classes.list}>
				<List>
					{/* {restaurantOrders.map((listitem) => ( */}
					{props.restaurantStore.Orders.map((listitem) => (
						<ListItem alignItems='flex-start' key={listitem._id}>
							<Divider />
							<ListItemText
								style={{
									color: "#333333",
									fontWeight: "bold",
									fontSize: "13px",
									justifyContent: "center",
								}}
								primary={listitem.orderitem}
								secondary={
									<React.Fragment>
										<div>
											<Link
												component='button'
												variant='body2'
												style={{
													color: "#333333",
													fontWeight: "bold",
													fontSize: "15px",
													justifyContent: "center",
												}}
												onClick={(event) =>
													routetoCustomer(event, listitem.userid)
												}>
												Customer: {listitem.username}
											</Link>
											<div>
												<Typography
													style={{
														color: "#333333",
														fontWeight: "bold",
														fontSize: "13px",
														justifyContent: "center",
													}}>
													Delievery Option:
												</Typography>
												{listitem.delieveryoption}
											</div>
											<label>
												<Typography
													style={{
														color: "#333333",
														fontWeight: "bold",
														fontSize: "13px",
														justifyContent: "center",
													}}>
													Delievery Status:
												</Typography>
												<select
													value={state.delieveryOption}
													onChange={(event) =>
														handleChange1(event.target.value)
													}>
													<option value='On the Way'>On the Way</option>
													<option value='Delievered'>Delievered</option>
													<option value='Pick Up Ready'>Pick Up Ready</option>
													<option value='Picked Up'>Picked Up</option>
												</select>
											</label>
										</div>
										<div>
											<label>
												<Typography
													style={{
														color: "#333333",
														fontWeight: "bold",
														fontSize: "13px",
														justifyContent: "center",
													}}>
													Order Filter:
												</Typography>
												<select
													value={state.orderFilter}
													onChange={(event) =>
														handleChange2(event.target.value)
													}>
													<option value='New Orders'>New Orders</option>
													<option value='Preparing'>Preparing</option>
													<option value='Delievered Order'>
														Delievered Order
													</option>
													<option value='Cancelled Order'>
														Cancelled Order
													</option>
												</select>
											</label>
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
												onClick={(event) =>
													handleOrderUpdate(listitem._id, listitem.userid)
												}>
												Update Order
											</Button>
											{msg}
										</div>
									</React.Fragment>
								}
							/>
						</ListItem>
					))}
				</List>
				<Divider />
			</div>
			): <p> No orders found!</p>}
		</div>
	);
}

const mapStateToProps = (state) => {
	const {restaurantStore} = state.restaurant;	
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
//export default Orders;
