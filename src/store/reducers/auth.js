import { ActionType } from "../actions";
const initialState = {
    cookie: null,
    user: null,
    isLoading: false,
    username : ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        //LOGIN

        case ActionType.LOGIN:
            return { ...state, isLoading: true };

        case ActionType.LOGIN_SUCCESS:
            return { ...state, cookie: action.payload.cookie,  username: action.payload.username, isLoading: false };

        case ActionType.LOGIN_FAIL:
            return { ...state, isLoading: false };
        
        
        // Update password

        case ActionType.UPDATE_PASSWORD:
            return { ...state, isLoading: true };

        case ActionType.UPDATE_PASSWORD_SUCCESS:
            return { ...state, isLoading: false };

        case ActionType.UPDATE_PASSWORD_FAIL:
            return { ...state, isLoading: false };


        //LOGOUT

        case ActionType.LOGOUT:
            return { ...state, isLoading: true };

        case ActionType.LOGOUT_SUCCESS:
            return { ...state, cookie : '', isLoading: false };

        default:
            return state
    }
};
