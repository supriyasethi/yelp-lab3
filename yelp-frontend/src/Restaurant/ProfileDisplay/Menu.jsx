import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar, Button, Grid } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import serverUrl from "../../config.js";

const useStyles = makeStyles((theme) => ({
	root: {
		//
		// width: '100%',
		// maxWidth: '36ch',
		marginLeft: 250,
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
}));

function Menu(props) {
	

	let history = useHistory();
	const [checked, setChecked] = React.useState([1]);
	let [state, setState] = React.useState({
		menu: [],
		pickup: false,
		delievery: false,
	});
  const newChecked = [...checked];
  //let [Menulist, setMenulist] = useState([]);	
  const[currentPage, setCurrentPage] = useState(1);
  const[postsPerPage] = useState(5);  

const indexofLastPost = currentPage * postsPerPage;
const indexofFirstPost = indexofLastPost - postsPerPage;
//const currentMenu = restaurantMenu.slice(indexofFirstPost, indexofLastPost);
const currentMenu = props.restaurantStore.Menu.slice(indexofFirstPost, indexofLastPost);
const menucount = props.restaurantStore.Menu.length;
const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(menucount / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	
	
	useEffect(() => {
		var newMenu = [];
    const data = localStorage.getItem("restaurantId");
   
	}, []);

	const classes = useStyles();
	let [msg, setmsg] = useState("");
	const rId = localStorage.getItem("restaurantId");
	const uId = localStorage.getItem("userId");
	const handleToggle = (value) => () => {
	const currentIndex = checked.indexOf(value);

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
		console.log(newChecked);
	};

	function handleCancel() {
		history.push("/homea");
	}

 
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	//   const handleChangeclick = (id) => {
	//     newid.push(id);
	//     //setState({ ...state, [event.target.name]: event.target.checked });
	// };
 
	//console.log("Menulist", Menulist);
	function handleOrder() {
		var orderItem = "";
		var id = "";
		var delieveryoption = "";
		console.log("state", props.restaurantStore.Menu.dishname);
		setmsg(<p>Order Placed</p>);
		for (var i = 0; i < newChecked.length; i++) {
			   for(var j=0; i< props.restaurantStore.Menu.length; j++) {
           if (newChecked[i] === props.restaurantStore.Menu[j]) {
             orderItem = orderItem + props.restaurantStore.Menu[j].dishname;
           }
			console.log(newChecked.length);
			id = newChecked[i];
			console.log("id", id);
			orderItem = orderItem + props.restaurantStore.Menu[id].dishname + ",";
		}
		}
		console.log("orderItem", orderItem);
		if (state.pickup) {
			delieveryoption = "PickUp";
		} else {
			delieveryoption = "PickUp";
		}

		let orderInfo = {
			orderItem,
			delieveryOption: delieveryoption,
			orderFilter: "New Order",
			restaurantId: rId,
			userId: uId,
		};

		axios.defaults.withCredentials = true;
		axios
			.post(serverUrl + "insert/order", orderInfo)
			.then((response) => {
				console.log("Status code: ", response.status);
				if (response.status === 200) {
					setmsg(<p>Order Placed</p>);
					history.push("/bizdisplay");
				}
			})
			.catch((error) => {
				console.log("error", error.response);
				//seterrmsg(<p>Reviews already given by the user</p>)
			});
		console.log("handleorder", orderItem);
	}

	return (
		<Grid container direction='row' spacing={40}>
			<Grid xs={0} sm={1} justify='center' />
			<Grid item xs={5} justify='center'>
				<div className={classes.root}>
					<div>
						<Typography
							style={{
								color: "#d32323",
								fontWeight: "bold",
								fontSize: "20px",
								justifyContent: "center",
							}}>
							Select Dish to Order
						</Typography>
					</div>
					<div>
						<Divider />
					</div>
					<List dense>
						{currentMenu.map((listitem) => (
							<ListItem key={listitem.restauarantid} button>
								<ListItemAvatar>
									<Avatar src={logo} />
								</ListItemAvatar>
								<ListItemText
									style={{ fontWeight: "bold" }}
									primary={listitem.dishname}
								/>
								<ListItemSecondaryAction>
									<Checkbox edge='end' onChange={handleToggle(listitem.restauarantid)} />
								</ListItemSecondaryAction>
							</ListItem>
						))}
					</List>
					<div className='module pt-xxsm'>
				<ul className='pagination' style={{ justifyContent: "left" }}>
					{pageNumbers.map((number) => (
						<li key={number} className='page-item'>
							<a onClick={() => paginate(number)} className='page-link'>
								{number}
							</a>
						</li>
					))}
				</ul>
			</div>
				</div>
			</Grid>
			<Grid item xs={5} justify='center'>
				<div className={classes.option}>
					<div>
						<Typography
							style={{
								color: "#d32323",
								fontWeight: "bold",
								fontSize: "20px",
								justifyContent: "center",
							}}>
							Select Delievery Option
						</Typography>
					</div>
					<FormGroup row>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.pickup}
									onChange={handleChange}
									name='pickup'
								/>
							}
							label='PickUp'
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.delievery}
									onChange={handleChange}
									name='delievery'
								/>
							}
							label='Delievery'
						/>
					</FormGroup>
				</div>
			</Grid>

			<Grid>
				<div className={classes.button}>
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
						onClick={handleOrder}>
						Place Order
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
					{msg}
				</div>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (state) => {
	console.log(state);	
	const {restaurantStore} = state.restaurant;	
	return {
		restaurantStore		
	};
}


// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		menuList: (payload) => {
// 			dispatch(
// 				menuList({
// 					type: updateMenuList,
// 					payload,
// 				})
// 			);
// 		},
// 	};
// };

export default connect(mapStateToProps, null)(Menu);


