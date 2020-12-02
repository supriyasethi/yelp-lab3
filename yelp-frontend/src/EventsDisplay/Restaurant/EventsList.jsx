import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar, Link, Button } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import serverUrl from "../../config.js";
import { updateRestaurantEventList } from "../../js/actionconstants/action-types";
import { getResEvent } from "../../js/actions/eventsActions";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,
	},
	inline: {
		display: "inline",
	},
}));

function EventsList(props) {	
	const dispatch = useDispatch();
	//console.log(props);
	let [state, setState] = React.useState({
		//events: [],
		authFlag: false
	});	
	var res = "";

	useEffect(() => {
		
		res = localStorage.getItem('restaurant_id');
        axios.defaults.withCredentials = true;
		axios.get(serverUrl+"get/event",{
            params: {
                restaurantId: res }
            })
        .then((response) => {
            //update the state with the response data			
			if (response.status === 200) {	
				console.log(response);
				setState({
					authFlag: true,					
				})
				let payload = {
					eventResList: response.data
				}
				dispatch(getResEvent(payload));
			}			
		})
		.catch((error) => {
			console.log(error);
		})
	}, []);
	
	function handleSortAsc() {		
		setState ({
			events: state.events.sort((a, b) =>
			a.date.split('/').reverse().join().localeCompare(b.date.split('/').reverse().join())),
			sortFlag: true
		})
	}
	function handleSortDesc() {		
		setState ({
			events:state.events.sort((b, a) =>
			a.date.split('/').reverse().join().localeCompare(b.date.split('/').reverse().join())),
			sortFlag: true
		})
	}
	const classes = useStyles();

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
					Events List
				</Typography>
			</div>
			<div>
				<Divider />
			</div>
			<div>
				<Button
					variant='contained'
					color='secondary'
					style={{
						height: "40px",
						width: "100px",
						fontSize: "12px",
						fontWeight: "bold",
						color: "#d32323",
						background: "white",
						borderColor: "#d32323",
						marginTop: "10px",
						marginLeft: "10px",
					}}
					onClick={handleSortAsc}>
					SortbyDate Asc
				</Button>
				<Button
					variant='contained'
					color='secondary'
					style={{
						height: "40px",
						width: "100px",
						fontSize: "12px",
						fontWeight: "bold",
						color: "#d32323",
						background: "white",
						borderColor: "#d32323",
						marginTop: "10px",
						marginLeft: "10px",
					}}
					onClick={handleSortDesc}>
					SortbyDate Desc
				</Button>
			</div>

			<List>
				{/* {state.events.map((listitem) => ( */}
					{props.eventResListStore.eventResList.map((listitem) => (
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
											Timing:
										</Typography>
										{listitem.time}
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Date:
										</Typography>
										{listitem.date}
									</div>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Location:
										</Typography>
										{listitem.location}
									</div>
									<div>
									{listitem.usersregistered.length > 0 ?
									listitem.usersregistered.map((list) => (
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											User Registered:{list.userfirstname} {list.userlastname} 
										</Typography>
										)) : 'No User Registered'}
									</div>
								</React.Fragment>
							}
						/>
					</ListItem>
				))}
			</List>
			<Divider />
		</div>
	);
}

const mapStateToProps = (state) => {	
	const {eventResListStore} = state.eventListReducer;	
	return {
		eventResListStore	
	};
};
const mapDispatchToProps = (dispatch) => {
	return {			
		getResEvent: (payload) => {
			dispatch(
				getResEvent({
					type: updateRestaurantEventList,
					payload,
				})
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);

//export default EventsList;
