const { updateRestaurantEventList, sortEventListAsc, sortEventListDsc, updateUserEventList } = require("../actionconstants/action-types");

export function getResEvent(payload) {	
	return (dispatch) => {
		dispatch(updateRestaurantEvent(payload));
	};
	function updateRestaurantEvent(payload) {
		return { type: updateRestaurantEventList, payload };
	}
}  

export function getUserEvent(payload) {	
	return (dispatch) => {
		dispatch(updateUserEvent(payload));
	};
	function updateUserEvent(payload) {
		return { type: updateUserEventList, payload };
	}
}  


export function sortEventsAsc(payload) {	
	return (dispatch) => {
		dispatch(sortEventAsc(payload));
	};
	function sortEventAsc(payload) {
		return { type: sortEventListAsc, payload };
	}
} 

export function sortEventsDsc(payload) {	
	return (dispatch) => {
		dispatch(sortEventDsc(payload));
	};
	function sortEventDsc(payload) {
		return { type: sortEventListDsc, payload };
	}
} 
