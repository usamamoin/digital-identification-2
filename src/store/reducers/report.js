import { ActionType } from "../actions";
const initialState = {
    report: null,
    reportlist: {
        orders: []
    },
    reportDetails: {
        order_details: {
            ORD_DATE: "",
            ORD_NO: "",
            address: "",
            name: "",
            status: ""
        },
        transactions: []
    },
    isLoading: false,
    username: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        //Get Reports Overview

        case ActionType.GET_REPORT:
            return { ...state, isLoading: true };

        case ActionType.GET_REPORT_SUCCESS:
            return { ...state, report: action.payload, isLoading: false };

        case ActionType.GET_REPORT_FAIL:
            return { ...state, isLoading: false };

        //Get Reports Details

        case ActionType.GET_REPORT_ORDER_LIST:
            return {
                ...state,
                reportlist: {
                    orders: []
                },
                isLoading: true
            };

        case ActionType.GET_REPORT_ORDER_LIST_SUCCESS:
            return { ...state, reportlist: action.payload, isLoading: false };

        case ActionType.GET_REPORT_ORDER_LIST_FAIL:
            return { ...state, isLoading: false };

        case ActionType.GET_REPORT_DETAILS:
            return {
                ...state,
                reportDetails: {
                    order_details: {
                        ORD_DATE: "",
                        ORD_NO: "",
                        address: "",
                        name: "",
                        status: ""
                    },
                    transactions: []
                },
                isLoading: true
            };

        case ActionType.GET_REPORT_DETAILS_SUCCESS:
            return {
                ...state,
                reportDetails: action.payload,
                isLoading: false
            };

        case ActionType.GET_REPORT_DETAILS_FAIL:
            return { ...state, isLoading: false };

        case ActionType.EDIT_REPORT:
            return { ...state, isLoading: true };

        case ActionType.EDIT_REPORT_SUCCESS:
            return { ...state, isLoading: false };

        case ActionType.EDIT_REPORT_FAIL:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};
