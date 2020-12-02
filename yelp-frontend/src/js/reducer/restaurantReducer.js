const { updateRestaurantProfile } = require("../actionconstants/action-types");

const defaultState = {
	restaurantStore: {
		Name: "",
		City: "",
		Description: "",
		Address: "",
		Timing: "",
		Emailid: "",
		Website: "",
		Phonenumber: "",
		Menu: [],
		Orders: [],
		Reviews: [],	
	},
};

const restaurantReducer = (state = defaultState, action) => {    
	console.log('payload in res reducer', action.payload);
	switch (action.type) {
		case updateRestaurantProfile: {            
			return {
                ...state,
                restaurantStore: { ...state.restaurantStore, ...action.payload },
                //   return Object.assign(state, action.payload);
              };
        }
        default: {
            return { ...state };
          }		
    }
    return state;  
};

export default restaurantReducer;
