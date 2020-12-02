const { usersList } = require("../actionconstants/action-types");

const defaultState = {
	users: {
		PageNo: "",
		PageCount: "",
		Totalcount: "",
		userlist: [],		
	},
};

const userListReducer = (state = defaultState, action) => {
	console.log("payload in user list reducer", action);
	switch (action.type) {
		case usersList: {
			console.log('inside user list reducer');
			return {
				...state,
				users: { ...state.users, ...action.payload },
				//   return Object.assign(state, action.payload);
			};
		}
		default: {
			return { ...state };
		}
	}
};

export default userListReducer;
