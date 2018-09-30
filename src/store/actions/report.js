
import { Actions } from "react-native-router-flux";

import { ActionType } from "./../actions";
import { get, post } from "../../utils/api-call";
import { actionDispatch } from "../../utils/return-obj";
import OrderAction from "../actions/order";


export default class ReportAction {
    /**
    |--------------------------------------------------
    | Get Report Overview
    |--------------------------------------------------
    */
    static getReportOverview() {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.GET_REPORT));

            const Cookie = getState().authReducer.cookie;
            get("/report", Cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        actionDispatch(ActionType.GET_REPORT_SUCCESS, response)
                    );
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(actionDispatch(ActionType.GET_REPORT_FAIL, error));
                });
        };
    }

    /**
    |--------------------------------------------------
    | Get Report Order List
    |--------------------------------------------------
    */
    static getReportOrderList(route) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.GET_REPORT_ORDER_LIST));

            const Cookie = getState().authReducer.cookie;

            get(route, Cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        actionDispatch(
                            ActionType.GET_REPORT_ORDER_LIST_SUCCESS,
                            response
                        )
                    );
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(
                            ActionType.GET_REPORT_ORDER_LIST_FAIL,
                            error
                        )
                    );
                });
        };
    }

    /**
    |--------------------------------------------------
    | Get Report Details
    |--------------------------------------------------
    */
    static getReportDetails({ord_no, isEdit}) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.GET_REPORT_DETAILS));

            const Cookie = getState().authReducer.cookie;

            get("/getInv&ord_no=" + ord_no, Cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        actionDispatch(
                            ActionType.GET_REPORT_DETAILS_SUCCESS,
                            response
                        )
                    );
                    response.isEdit = isEdit;
                    Actions.detailedReport(response);
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(
                            ActionType.GET_REPORT_DETAILS_FAIL,
                            error
                        )
                    );
                });
        };
    }

    /**
    |--------------------------------------------------
    | Edit Report
    |--------------------------------------------------
    */

    static editReport(ord_no) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.EDIT_REPORT));
            const Cookie = getState().authReducer.cookie;
            let form = new FormData();
            form.append("entity_no", ord_no);
            
            post("/edit", form, Cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    response.ord_no = ord_no;
                    response.isEditFromOrder = true;
                    
                    dispatch(
                        actionDispatch(ActionType.EDIT_REPORT_SUCCESS)
                    );
                    dispatch(
                        actionDispatch(ActionType.EDIT_REPORT_SUCCESS_ORDER, response)
                    )
                    dispatch(OrderAction.freightCalculation(response))
                    dispatch(OrderAction.getFlavourPacks())
                    
                    Actions.productlist({
                        selectedCustomer: response.selectedCustomer
                    });
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(ActionType.EDIT_REPORT_FAIL, error)
                    );
                });
        };
    }
}
