import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Button, Link } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


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

function Reviews(props) {
	
	//let restaurantReviews = restaurantData.restaurantData.restaurant.Reviews;

	// let httpURL = "http://localhost:3001";
	// //let httpURL = "http://54.219.75.46:3001";
    const classes = useStyles();   
	let history = useHistory();
	// const [checked, setChecked] = React.useState([1]);
	// let [state, setState] = React.useState({
	// 	orders: [],
	// 	delieverystatus: "",
	// 	orderfilter: "",
	// });

	// var newOrder = [];
	// const data = localStorage.getItem("restaurantId");

	// useEffect(() => {
	// 	console.log("data", data);
	// 	axios.defaults.withCredentials = true;
	// 	axios
	// 		.get(httpURL+"/get/reviews", {
	// 			params: {
	// 				restaurantId: data,
	// 			},
	// 		})
	// 		.then((response) => {
    //             //update the state with the response data
    //             console.log(response);
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
					Reviews
				</Typography>
			</div>
			<div>
				<Divider />
			</div>
			{props.restaurantStore.Reviews && (props.restaurantStore.Reviews) > 0 ? (
			<div className={classes.list}>
				<List>
					{/* {restaurantReviews.map((listitem) => ( */}
						{props.restaurantStore.Reviews.map((listitem) => (
						<ListItem alignItems='flex-start' key={listitem._id}>
							<Divider />
                          
							<ListItemText
								style={{
									color: "#333333",
									fontWeight: "bold",
									fontSize: "13px",
									justifyContent: "center",
								}}
								primary="Reviews"
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
												Customer:
												{listitem.username} 
											</Link>
											<div>
												<Typography
													style={{
														color: "#333333",
														fontWeight: "bold",
														fontSize: "13px",
														justifyContent: "center",
													}}>
													What does he say?:
												</Typography>
												{listitem.review}
											</div>
											<div>
												<Typography
													style={{
														color: "#333333",
														fontWeight: "bold",
														fontSize: "13px",
														justifyContent: "center",
													}}>
													How did he rate?
                                                    {listitem.rating}
												</Typography>
												
										</div>									
										</div>
										
									</React.Fragment>
								}
							/>
						</ListItem>
					))}
				</List>
				<Divider />
			</div>
			): (<p>No reviews found!</p>)}
		</div>
	);
}

const mapStateToProps = (state) => {	
	const {restaurantStore} = state.restaurant;
	return {
		restaurantStore,
	};
};

export default connect(mapStateToProps, null)(Reviews);
//export default Reviews;
