const { updateRestaurantProfile, updateMenuList, updateMessageList } = require("../actionconstants/action-types");

export function getProfile(payload) {	
	return (dispatch) => {
		dispatch(updateProfile(payload));
	};
	function updateProfile(payload) {
		return { type: updateRestaurantProfile, payload };
	}
}  

export function menuList(payload) {	
	return (dispatch) => {
		dispatch(updateList(payload));
	};
	function updateList(payload) {
		return { type: updateMenuList, payload };
	}
}  

export function updateMessages(payload) {	
	return (dispatch) => {
		dispatch(updateMessage(payload));
	};
	function updateMessage(payload) {
		return { type: updateMessageList, payload };
	}
} 