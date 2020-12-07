const { updateUserProfile } = require("../actionconstants/action-types");

const defaultState = {
	userStore: {
		Firstname: "",
		Lastname: "",
		Dateofbirth: "",
		City: "",
		State: "",
		Country: "",
		Nickname: "",
		Gender: "",
		Emailid: "",
		Phonenumber: "",
		Yelpingsince: "",
		Thingsilove: "",
		Findmein: "",		
		Orders: [],
		Reviews: [],
		Events: [],
	},
};

const userReducer = (state = defaultState, action) => {
	console.log('payload in userreducer', action.payload);
	switch (action.type) {
		case updateUserProfile: {
			return {
				...state,
				userStore: { ...state.userStore, ...action.payload },
				//   return Object.assign(state, action.payload);
			};
		}
		default: {
			return { ...state };
		}
	}	
};

export default userReducer;
