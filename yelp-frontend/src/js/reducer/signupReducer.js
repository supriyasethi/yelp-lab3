import {
	SIGNUP_USER,
	LOG_OUT,
	SIGNUP_ERROR,
} from "../actionconstants/action-types";

const initialState = {
	//users : [],
	isAlreadyRegistered: null,
	isRegistered: null,
};

const signupReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP_USER: {
			return {
				isRegistered: "true",
				isAlreadyRegistered: "false",
			};
		}
		case SIGNUP_ERROR: {
			return {
				isRegistered: "false",
				isAlreadyRegistered: "true",
			};
		}
		case LOG_OUT: {
			return {
				isRegistered: false,
			};
		}
	}
	return state;
};

export default signupReducer;
