import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Button, Link, Avatar } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		//
		// width: '100%',
		// maxWidth: '36ch',
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

function ListInfo() {
	//let httpURL = "http://localhost:3001";
	let httpURL = "http://54.219.75.46:3001";
	let history = useHistory();
	const [checked, setChecked] = React.useState([1]);
	let [state, setState] = React.useState({
		orders: [],
		delieverystatus: "",
		orderfilter: "",
	});

	var newOrder = [];
	const data = localStorage.getItem("userId");
	var prev = "";

	useEffect(() => {
		console.log("data", data);
		axios.defaults.withCredentials = true;
		axios
			.get(httpURL+"/get/bizlist", {
				params: {
					userId: data,
				},
			})
			.then((response) => {
				//update the state with the response data
				for (var i = 0; i < response.data.length; i++) {
					if (prev === response.data[i].name){
						console.log('skip');
					} else {
					var temp = response.data[i];
					newOrder.push({
						id: i,
						items: temp,
					}); 
					prev = response.data[i].name;
					}
				}
				setState({
					orders: newOrder,
				});
			});
	}, []);

	const classes = useStyles();
	let [msg, setmsg] = useState("");
	
	const handleChange1 = (value) => {
        console.log('value', value);
		setState({ ...state, delieverystatus: value });
    };
    
    const handleChange2 = (value) => {
		setState({ ...state, orderfilter: value });
	};

	function handleOrderUpdate(orderid, resId) {
		let orderInfo = {
			delieveryStatus: state.delieverystatus,
			orderFilter: state.orderfilter,
			orderId: orderid,
			restaurantId: resId,
		};
        console.log('orderinfo', orderInfo);
		axios.defaults.withCredentials = true;
		axios
			.post(httpURL+"/update/order", orderInfo)
			.then((response) => {
				console.log("Status code: ", response.status);
				if (response.status === 200) {
					setmsg(<p>Order Updated</p>);
					history.push("/bizdisplay");
				}
			})
			.catch((error) => {
				console.log("error", error.response);
				//seterrmsg(<p>Reviews already given by the user</p>)
			});
	}

	function routetoReview(rId, uId) {
		localStorage.setItem('restaurantId', rId);
		localStorage.setItem('userId', uId);
		history.push('/ureviews')
			
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
			<div className={classes.list}>
				<List>
					{state.orders.map((listitem) => (
						<ListItem alignItems='flex-start' key={listitem.id}>
							<Divider />
                            <ListItemAvatar>
								<Avatar alt='Remy Sharp' src={logo} />
							</ListItemAvatar>
							<ListItemText
								style={{
									color: "#333333",
									fontWeight: "bold",
									fontSize: "13px",
									justifyContent: "center",
								}}
								primary={listitem.items.name}
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
													routetoReview(listitem.items.restaurantId, listitem.items.userId)
												}>
												Write a Review
											</Link>
											
										</div>
									</React.Fragment>
								}
							/>
						</ListItem>
					))}
				</List>
				<Divider />
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

//export default connect(mapStateToProps, null)(UserInfo);
export default ListInfo;
