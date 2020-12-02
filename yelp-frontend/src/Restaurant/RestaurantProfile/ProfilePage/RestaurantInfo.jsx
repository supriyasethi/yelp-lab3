import React, { Components, useState, useEffect } from "react";
//import { IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/homepage1.jpg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
//import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

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
		height: 150,
	},
}));

function RestaurantInfo(props) {
	let history = useHistory();

	const classes = useStyles();

	function handleUpdateProfile() {
		history.push("/updatebprofile");
	}

	//let restaurantInfo = restaurantData.restaurantData.restaurant;
	return (
		<div className={classes.container}>
			<div className={classes.user} style={{ display: "inline-block" }}>
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia className={classes.media} image={logo} />
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{props.restaurantStore.Name}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								{props.restaurantStore.Address}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								Timing: {props.restaurantStore.Timing}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
			<div>
				<Divider orientation='vertical' />
			</div>
			<div className={props.restaurantStore.update}>
				<Button
					onClick={handleUpdateProfile}
					color='secondary'
					style={{
						color: "#333333",
						"font-size": "12px",
						"font-weight": "bold",
					}}>
					Edit Business Information
				</Button>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	const {restaurantStore} = state.restaurant;
	return {
		restaurantStore,
	};
};

export default connect(mapStateToProps, null)(RestaurantInfo);
//export default RestaurantInfo;
