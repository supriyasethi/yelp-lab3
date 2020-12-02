import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
import { setLogin } from "../js/actions/index";
import { useDispatch, connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const LoginForm = ({ title, sender, loginsuccess, loginfailure }) => {
	let history = useHistory();
	//var httpURL1 = "";
	//let httpURL = "http://localhost:3001";
	//let httpURL = "http://54.219.75.46:3001";
	const dispatch = useDispatch();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [authErr, setauthErr] = useState("");
	const [usernameErr, setUserNameErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");

	if (loginsuccess === "true") {
		if (sender === "user") {
			history.push("/homea");
		} else {
			history.push("/bizp");
		}
	}
	if (loginfailure === "true") {
		setPasswordErr(<p>Username & Password are invalid!</p>);
	}

	function onSubmitHandle() {
		let loginFormInfo = {
			username: username,
			password: password,
			sender: sender,
		};

		setUserNameErr("");
		setPasswordErr("");
		dispatch(setLogin({ loginFormInfo }));

		//history.push('/homea');
		// if (sender === "user") {
		// 	httpURL1 = httpURL + "/login/user";
		// }
		// if (sender === "biz") {
		// 	httpURL1 = httpURL + "/login/biz";
		// }
		// axios.defaults.withCredentials = true;
		// console.log("logininfo", loginFormInfo);
		// axios
		// 	.post(httpURL1, loginFormInfo)
		// 	.then((response) => {
		// 		console.log("Status code: ", response.status);
		// 		if (response.status === 200) {
		// 			console.log("login response", response);
		// 			if (sender === "user") {
		// 				var token = response.data.token;
		// 				if (token.length > 0) {
		// 					localStorage.setItem("token", token);

		// 					var decoded = jwt_decode(token.split(" ")[1]);
		// 					localStorage.setItem("user_id", decoded._id);
		// 					localStorage.setItem("username", decoded.username);
		// 					history.push("/homea");
		// 				}
		// 			} else {
		// 				token = response.data.token;
		// 				if (token.length > 0) {
		// 					localStorage.setItem("token", token);

		// 					decoded = jwt_decode(token.split(" ")[1]);
		// 					localStorage.setItem("restaurant_id", decoded._id);
		// 					localStorage.setItem("res_u_name", decoded.username);
		// 					history.push("/bizp");
		// 				}
		// 			}
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log("error", error);
		// 		if (error.response.status === 401) {
		// 			//authFlag = true;
		// 			setauthErr(
		// 				<p class='alert alert-danger' role='alert'>
		// 					{error.response.data}
		// 				</p>
		// 			);
		// 			//return authErr;
		// 			console.log(error.response.data);
		// 			console.log("authErr", authErr);
		// 		}
		// 		if (error.response.status === 422) {
		// 			for (var i = 0; i < error.response.data.length; i++) {
		// 				if (error.response.data[i].param === "username") {
		// 					setUserNameErr(
		// 						<p class='alert alert-danger' role='alert'>
		// 							{error.response.data[i].msg}
		// 						</p>
		// 					);
		// 				}
		// 				if (error.response.data[i].param === "Title") {
		// 					setPasswordErr(
		// 						<p class='alert alert-danger' role='alert'>
		// 							{error.response.data[i].msg}
		// 						</p>
		// 					);
		// 				}
		// 			}
		// 		}
		//     });
		loginFormInfo = {};
	}

	function onSubmitSignup() {
		if (sender === "user") {
			history.push("/signup");
		} else if (sender === "biz") {
			history.push("/signupbiz");
		}
	}

	const classes = useStyles();

	return (
		<div className={classes.root} style={{ paddingTop: "150px" }}>
			<Typography
				style={{
					color: "#d32323",
					fontWeight: "bold",
					fontSize: "21px",
				}}>
				{title}
			</Typography>
			<Typography
				style={{
					color: "#333333",
					fontWeight: "bold",
					fontSize: "14px",
				}}>
				New to Yelp?
				<Button
					color='primary'
					style={{
						color: "#0073bb",
						fontWeight: "bold",
						fontSize: "14px",
					}}
					onClick={onSubmitSignup}>
					SignUp
				</Button>
			</Typography>
			<Typography style={{ fontSize: "12px" }}>
				By logging in, you agree to Yelp’s Terms of Service and Privacy Policy.
			</Typography>
			<div className={classes.root}>
				<Button
					variant='contained'
					color='primary'
					style={{
						height: "37px",
						width: "300px",
						background: "#0073bb",
					}}>
					Continue with Facebook
				</Button>
				<Button
					variant='contained'
					color='default'
					style={{
						height: "37px",
						width: "300px",
						background: "#cccccc",
					}}>
					Continue with Google
				</Button>
				<Button
					variant='contained'
					color='primary'
					style={{
						height: "37px",
						width: "300px",
						background: "#333333",
					}}>
					Continue with Apple
				</Button>
			</div>
			<Typography>OR</Typography>
			<form noValidate autoComplete='off' className={classes.root}>
				<TextField
					id='outlined-basic'
					label='Email'
					variant='outlined'
					size='small'
					style={{ height: "30px", width: "300px" }}
					onChange={(e) => setUserName(e.target.value)}
				/>{" "}
				{usernameErr}
				<TextField
					id='outlined-basic'
					label='Password'
					variant='outlined'
					size='small'
					type='password'
					style={{ height: "30px", width: "300px" }}
					onChange={(e) => setPassword(e.target.value)}
				/>{" "}
				{passwordErr}
				<Button
					color='primary'
					style={{
						color: "#0073bb",
						fontSize: "11px",
					}}>
					Forgot Password?
				</Button>
				<Button
					onClick={onSubmitHandle}
					variant='contained'
					color='secondary'
					style={{
						"min-height": "37px",
						width: "300px",
						background: "#d32323",
					}}>
					Log In
				</Button>
			</form>
			<div>{authErr}</div>
			<Typography
				style={{
					color: "#e6e6e6",
					fontSize: "10px",
				}}>
				New to Yelp?
				<Button
					color='primary'
					style={{
						color: "#0073bb",
						fontSize: "10px",
					}}
					onClick={onSubmitSignup}>
					SignUp
				</Button>
			</Typography>
		</div>
	);
};

function mapDispatchToProps(dispatch) {	
	return {
		setLogin: (loginFormInfo) => dispatch(setLogin(loginFormInfo)),
	};
}

const mapStateToProps = (state) => {
	return {
		user: state.login.user,
		loginsuccess: state.login.loginsuccess,
		loginfailure: state.login.loginfailure,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
//export default LoginForm;
