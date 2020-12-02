import {
	SIGNUP_USER,
	SIGNUP_ERROR,
	LOG_IN,
	LOGIN_ERROR,
	LOG_OUT,
} from "../actionconstants/action-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import serverUrl from "../../config.js";

export function setLogin(payload) {
	return (dispatch) => {
		const user = payload.loginFormInfo.sender;
		axios.defaults.withCredentials = true;
		return axios
			.post(serverUrl +"login/" + user, payload.loginFormInfo)
			.then((response) => {
				if (response.status === 200) {
					if (user === "user") {
						var token = response.data.token;
						console.log('response in login', response);
						if (token.length > 0) {
							localStorage.setItem("token", token);
							var decoded = jwt_decode(token.split(" ")[1]);
							localStorage.setItem("user_id", decoded._id);
							localStorage.setItem("username", decoded.username);
							localStorage.setItem("userfirstname", decoded.firstname);
							localStorage.setItem("userlastname", decoded.lastname);
							dispatch(success({ payload }));
						}
					} else {
						token = response.data.token;
						if (token.length > 0) {
							localStorage.setItem("token", token);

							decoded = jwt_decode(token.split(" ")[1]);
							localStorage.setItem("restaurant_id", decoded._id);
							localStorage.setItem("res_u_name", decoded.username);
							dispatch(success({ payload }));
						}
					}
				}
			})
			.catch((error) => {
				console.log('error', error);
				if (error.response.status === 401) {
					payload = error.response.data;
					dispatch(failure());
				}
				if (error.response.status === 422) {
					payload = error.response.data;
					dispatch(failure());
				}
			});
	};
	function success(payload) {
		return { type: LOG_IN, payload };
	}
	function failure() {
		return { type: LOGIN_ERROR };
	}
}

export function setLogout() {
	return (dispatch) => {
		dispatch(logout());
	};
	function logout() {
		return { type: LOG_OUT };
	}
}

export function signupUser(payload) {
	return (dispatch) => {
		axios.defaults.withCredentials = true;
		return axios
			.post("http://localhost:3001/signup", payload)
			.then((response) => {
				if (response.status === 200) {
					dispatch(failure());
				}
			})
			.catch((error) => {
				if (error.response.status === 422) {
					console.log(error);
					payload = error.response.data;
					dispatch(success());
				}
			});
	};
	function success() {
		return { type: SIGNUP_USER };
	}
	function failure() {
		return { type: SIGNUP_ERROR };
	}
}
