import React, { useState, useEffect } from "react";
//import { IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Typography,  Divider } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { connect, useDispatch } from "react-redux";


const useStyles = makeStyles(() => ({
	container: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "space-between",
		width: "120%",
		padding: "20",
	},
	user: {
		flexGrow: "5",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		marginTop: "80px",
	},

	update: {
		flexGrow: "2",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		marginTop: "80px",
	},
	root: {
    maxWidth: 700,
  },
  media: {
    height: 150 ,
  },
}));

function Info(props) {
	//let restaurant = restaurantData.restaurantData.restaurant;
	//console.log(restaurant);
	
	let history = useHistory();
	let [name, setname] = useState("");
	let [address, setaddress] = useState("");
	let [timing, settiming] = useState("");
	let [description, setdescription] = useState("");
	let [picutre, setpicture] = useState(null);

	useEffect(() => {
		setname(props.restaurantStore.name);
		setaddress(props.restaurantStore.city + "," + props.restaurantStore.state);
		settiming(props.restaurantStore.timing);
		setdescription(props.restaurantStore.description);
        // const data = localStorage.getItem('restaurantId');
		// axios.defaults.withCredentials = true;
		// axios.get("http://localhost:3001/get/bizp",
		// {params : {
		// 	restaurantId: data
		//   }}
		// ).then((response) => {
		// 	//update the state with the response data
		// 	console.log(response);
		// 	setname(response.data[0].name);
		// 	setaddress(response.data[0].address + "," + response.data[0].city);
		// 	settiming(response.data[0].timing);
		// 	setdescription(response.data[0].description);
		// 	// if(response.data[0].profile_img != null)     {
		// 	//   setpicture(<Avatar
		// 	//     variant="square"
		// 	//     src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"
		// 	//      style={{
		// 	//      margin: "10px",
		// 	//      width: "220px",
		// 	//      height: "220px",
		// 	//    }}
		// 	//    />);
		// 	// } else {
		// 	//   setpicture(<img src={response.data[0].profileimg} style={{
		// 	//                   margin: "10px",
		// 	//                   width: "100px",
		// 	//                   height: "100px",
		// 	//                 }} />);
		// 	// }
		//});
	}, []);

	const classes = useStyles();

	function handleUpdateProfile() {
		history.push("/updateuprofile");
	}

	return (
		<div className={classes.container}>
			<div className={classes.user} style={{ display: "inline-block" }}>
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image={logo}							
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{props.restaurantStore.name}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								{props.restaurantStore.city}, {props.restaurantStore.state}
							</Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
								Timing: {props.restaurantStore.timing}
							</Typography>
						</CardContent>
					</CardActionArea>					
				</Card>	
			</div>
			<div>
				<Divider orientation='vertical' />
			</div>			
		</div>
	);
}

// const mapStateToProps = (state) => {
// 	console.log(state);
// 	const restaurantData = state.restaurant;
// 	const menuData = state.menu;
// 	return {
// 		restaurantData,
// 	};
// };
const mapStateToProps = (state) => {
	console.log(state);	
	const {restaurantStore} = state.restaurant;	
	return {
		restaurantStore		
	};
}


export default connect(mapStateToProps, null)(Info);
