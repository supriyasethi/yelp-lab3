const { updateUserProfile, usersList } = require("../actionconstants/action-types");

export function getUserProfile(payload) {	
	console.log('payload in useractions', payload);
	return (dispatch) => {
		dispatch(updateUProfile(payload));
	};
	function updateUProfile(payload) {
		return { type: updateUserProfile, payload };
	} 
}  

export function getUserList(payload) {	
	console.log('payload in useractions', payload);
	return (dispatch) => {
		dispatch(getuserlist(payload));
	};
	function getuserlist(payload) {
		return { type: usersList, payload };
	} 
} 