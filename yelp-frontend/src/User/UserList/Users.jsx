import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Typography,
	Divider,
	Avatar,
	Link,
	Button,
	TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { usersList } from "../../js/actionconstants/action-types";
import { getUserList } from "../../js/actions/userActions";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import serverUrl from "../../config.js";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,
	},
	inline: {
		display: "inline",
	},
	input: {
		width: "200px",
		height: "5px",
	},
}));

function Users() {
	
	const dispatch = useDispatch();
	let history = useHistory();
	let [Userlist, setUserlist] = useState([]);
	let [searchkey, setsearchkey] = useState("");
	let [searchUser, setSearchUser] = useState("false");
	let [Pageno, setPageno] = useState();
	let [PageCount, setPageCount] = useState();
	let [TotalCount, setTotalCount] = useState();
	let [UserFollowMsg, setUserFollowMsg] = useState();

	const fetchUsers = async (PageNo = 0) => {
		await axios
			.get(serverUrl + "get/users", {
				params: {
					SearchKey: searchkey,
					PageNo,
				},
				withCredentials: true,
			})
			.then((response) => {
				console.log("searchUser", response);
				let response_data = JSON.parse(response.data);
				console.log("response_data", response_data);
				setUserlist(response_data[0]);
				setPageno(PageNo);
				setPageCount(5);
				setTotalCount(response_data[1]);
				let payload = Userlist;
				console.log("payload in users", Userlist);
				dispatch(getUserList(payload));
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(TotalCount / PageCount); i++) {
		pageNumbers.push(i);
	}

	function handleSearchChange(e) {
		setsearchkey(e.target.value);
	}

	function handleProfileClick(listitem) {
		console.log("inside handle profile click");
		console.log("listitem", listitem);

		localStorage.setItem("u_firstname", listitem.firstname);
		localStorage.setItem("u_lastname", listitem.lastname);
		localStorage.setItem("u_city", listitem.city);
		localStorage.setItem("u_state", listitem.state);
		localStorage.setItem("u_yelpingsince", listitem.yelpingsince);
		localStorage.setItem("u_thingsilove", listitem.thingsilove);
		localStorage.setItem("u_findmein", listitem.findmein);

		history.push("/userdisplay");
	}

	function handleFollowUser(listitem) {
		let userInfo = {
			userid: listitem.userid,
			firstname: listitem.firstname,
			lastname: listitem.lastname,
			city: listitem.city,
			state: listitem.state,
			yelpingsince: listitem.yelpingsince,
			thingsilove: listitem.thingsilove,
			findmein: listitem.findmein,
		};
		axios
			.post(serverUrl + "insert/userfollow", userInfo)
			.then((response) => {
				console.log("searchUser", response);
				if (response.status === 200) setUserFollowMsg(response.data);
			})
			.catch((error) => {
				console.log(error);
				//setUserFollowMsg(error);
			});
	}

	function handleSearchUser() {
		fetchUsers();
	}

	function onPageClick(pageno) {
		const page = pageno - 1;
		fetchUsers(page);
	}
	console.log("Userlist", Userlist);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>
				<TextField
					className={`input is-medium ${classes.input}`}
					id='outlined-basic'
					placeholder='UserName'
					variant='outlined'
					size='medium'
					type='text'
					name='searchkey'
					value={searchkey}
					style={{
						height: "35px",
					}}
					onChange={handleSearchChange}
				/>
				<Button
					variant='contained'
					color='secondary'
					style={{
						height: "55px",
						width: "100px",
						fontSize: "12px",
						fontWeight: "bold",
						background: "#d32323",
					}}
					onClick={handleSearchUser}>
					Search
				</Button>
			</div>

			<List>
				{Userlist.map((listitem) => (
					<ListItem alignItems='flex-start' key={listitem.userid}>
						<Divider />
						<ListItemAvatar>
							<Avatar alt='Remy Sharp' src={logo} />
						</ListItemAvatar>
						<ListItemText
							primary={listitem.firstname}
							secondary={
								<React.Fragment>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Location:
										</Typography>
										{listitem.city}, {listitem.state}
									</div>
									<div>
										<Link
											component='button'
											variant='body2'
											style={{
												fontSize: "14px",
												fontWeight: "bold",
											}}
											onClick={() => handleProfileClick(listitem)}>
											View Profile
										</Link>
									</div>
									<div>
										<Link
											component='button'
											variant='body2'
											style={{
												fontSize: "14px",
												fontWeight: "bold",
											}}
											onClick={() => handleFollowUser(listitem)}>
											Follow User
										</Link>
										
									</div>
								</React.Fragment>
							}
						/>
					</ListItem>
				))}
			</List>
			{UserFollowMsg}
			<div className='module pt-xxsm'>
				<ul className='pagination' style={{ justifyContent: "left" }}>
					{pageNumbers.map((number) => (
						<li key={number} className='page-item'>
							<a onClick={() => onPageClick(number)} className='page-link'>
								{number}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		getUserList: (payload) => {
			dispatch(
				getUserList({
					type: usersList,
					payload,
				})
			);
		},
	};
};

export default connect(null, mapDispatchToProps)(Users);

//export default Users;
