import { ActionType } from "../actions";
const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        //  Submit Deposit Form

        case ActionType.SUBMIT_DEPOSIT_FORM:
            return { ...state, isLoading: true };

        case ActionType.SUBMIT_DEPOSIT_FORM_SUCCESS:
            return { ...state, isLoading: false };

        case ActionType.SUBMIT_DEPOSIT_FORM_FAIL:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};
