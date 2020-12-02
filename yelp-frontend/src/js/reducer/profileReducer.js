const { FETCH_PROFILE } = require("../actionconstants/action-types")

const initialState = {
    firstname : [],
    zipcode : []   
    
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE: {
            console.log('inside fetch case ', action.payload)
           return  {
               firstname : action.payload.data.firstname,
               zipcode   : action.payload.data.zipcode                 
    }
}
}
return state;
}

export default profileReducer;