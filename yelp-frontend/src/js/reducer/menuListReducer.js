const { updateMenuList } = require("../actionconstants/action-types");

const defaultState = {
  companyListStore: {
    menuList: [],
    PageNo: 0,
    PageCount: 5,
    Totalcount: 10,
  },
};

const menuListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateMenuList: {
      return {
        ...state,
        companyListStore: { ...state.companyListStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default menuListReducer;
