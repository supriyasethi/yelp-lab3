import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Button, Link } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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

function ViewOrder() {

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

	useEffect(() => {
		console.log("data", data);
		axios.defaults.withCredentials = true;
		axios
			.get(httpURL+"/get/vieworder", {
				params: {
					userId: data,
				},
			})
			.then((response) => {
        console.log(response);
				//update the state with the response data
				for (var i = 0; i < response.data.length; i++) {
					var temp = response.data[i];
					newOrder.push({
						id: i,
						items: temp,
					});
				}
				setState({
					orders: newOrder,
				});
			});
	}, []);

	const classes = useStyles();
	let [msg, setmsg] = useState("");	

	

	function routetoRestaurant(e, name) {
    localStorage.setItem('restaurantId', name);
		history.push("/bizdisplay")
			//pathname: "/bizdisplay",
			//state: { data: id },
		//});
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
							<ListItemText
								style={{
									color: "#333333",
									fontWeight: "bold",
									fontSize: "13px",
									justifyContent: "center",
								}}
								primary={listitem.items.orderItem}
								secondary={
									<React.Fragment>
                    <div>											
											<Typography
													style={{
														color: "#333333",
														fontWeight: "bold",
														fontSize: "13px",
														justifyContent: "center",
													}}>
													Order Status: {listitem.items.orderFilter}
												</Typography>									
											</div>
										<div>											
											<Typography
													style={{
														color: "#333333",
														fontWeight: "bold",
														fontSize: "13px",
														justifyContent: "center",
													}}>
													Delievery Status: {listitem.items.delieveryStatus}
												</Typography>									
											</div>
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
													routetoRestaurant(event, listitem.items.name)
												}>											
												{listitem.items.name}											
											</Link>												
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
export default ViewOrder;
