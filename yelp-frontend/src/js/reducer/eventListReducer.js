const { updateRestaurantEventList,updateUserEventList } = require("../actionconstants/action-types");

const defaultState = {
  eventResListStore: {
    eventResList: [],  
  },
  eventUserListStore: {
    eventUserList: [],  
  },
};

const eventListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateRestaurantEventList: {
      return {
        ...state,
        eventResListStore: { ...state.eventResListStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }  
    case updateUserEventList: {
      return {
        ...state,
        eventUserListStore: { ...state.eventUserListStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }  

    default: {
      return { ...state };
    }
  }
};

export default eventListReducer;
