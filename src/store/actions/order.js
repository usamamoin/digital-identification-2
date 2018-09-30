import { ActionType } from "./../actions";
import { post, get } from "../../utils/api-call";
import { actionDispatch } from "../../utils/return-obj";

import { Actions } from "react-native-router-flux";
import { Alert } from "react-native";

export default class Order {
    /**
    |--------------------------------------------------
    | Get All Customer
    |--------------------------------------------------
    */

    static getAllCustomer(username) {
        return dispatch => {
            dispatch(actionDispatch(ActionType.GET_CUSTOMERS));
            let form = new FormData();
            form.append("username", username);
            post("/customer", form)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        actionDispatch(
                            ActionType.GET_CUSTOMERS_SUCCESS,
                            response
                        )
                    );
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(ActionType.GET_CUSTOMERS_FAIL, error)
                    );
                });
        };
    }

    /**
    |--------------------------------------------------
    | Reset Product List
    |--------------------------------------------------
    */

    static resetProductList() {
        return dispatch => {
            dispatch(actionDispatch(ActionType.RESET_PRODUCT_LIST));
        };
    }

    /**
    |--------------------------------------------------
    | Get Flavours and Packs
    |--------------------------------------------------
    */

    static getFlavourPacks() {
        return dispatch => {
            dispatch(actionDispatch(ActionType.GET_FLAVOURS_PACKS));
            get("/GetClasses")
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        actionDispatch(
                            ActionType.GET_FLAVOURS_PACKS_SUCCESS,
                            response.classes
                        )
                    );
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(
                            ActionType.GET_FLAVOURS_PACKS_FAIL,
                            error
                        )
                    );
                });
        };
    }

    /**
    |--------------------------------------------------
    | Get Discount Scheme
    |--------------------------------------------------
    */

    static getDiscountScheme(obj) {
        return dispatch => {
            dispatch(actionDispatch(ActionType.GET_QUANTITY_SCHEME));
            let form = new FormData();
            form.append("DIST_ID", obj.DIST_ID);
            form.append("ITEM_CODE", obj.ITEM_CODE);
            form.append("CLS_ID", obj.CLS_ID);
            form.append("QTY", obj.QTY);
            post("/GetQuantityTotal", form)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        actionDispatch(
                            ActionType.GET_QUANTITY_SCHEME_SUCCESS,
                            response
                        )
                    );
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(
                            ActionType.GET_QUANTITY_SCHEME_FAIL,
                            error
                        )
                    );
                });
        };
    }

    /**
    |--------------------------------------------------
    | Get Freight Calculation
    |--------------------------------------------------
    */

    static freightCalculation(obj) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.GET_FREIGHT_CALCULATION));
            if(!obj.isEditFromOrder){
                dispatch(actionDispatch(ActionType.SAVE_PLACED_ORDER_SUCCESS, obj));
            }
            

            const state = getState();
            const placedOrder = [...state.orderReducer.placedOrder];
            let scheme_desc = placedOrder[0].schemeItem.split(
                ","
            )[0];

            const products = placedOrder.map(item => {
                return {
                    itemcode: item.itemCode,
                    scheme_total: item.schemeTotal,
                    qty: item.quantity,
                    scheme_desc
                };
            });

            let form = new FormData();
            form.append("entity_no", obj.selectedCustomer.ENTITY_NO);
            products.map((item, index) => {
                Object.entries(item).forEach(([key, value]) => {
                    form.append(`product[${index}][${key}]`, value);
                });
            });

            post("/Calculatefreight", form, state.authReducer.cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        actionDispatch(
                            ActionType.GET_FREIGHT_CALCULATION_SUCCESS,
                            response
                        )
                    );
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(
                            ActionType.GET_FREIGHT_CALCULATION_FAIL,
                            error
                        )
                    );
                });
        };
    }

    /**
    |--------------------------------------------------
    | Add Order
    |--------------------------------------------------
    */

    static addOrder(obj) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.ADD_ORDER));
            
            const state = getState();
            const products = state.orderReducer.placedOrder.map(item => {
                return {
                    item_code: item.itemCode,
                    cls_id: item.classCode,
                    qty: item.quantity,
                    scheme_desc: item.schemeItem.split(",")[0]
                };
            });
            let form = new FormData();
            form.append("entity_no", obj.entity_no);
            form.append("inv_no", state.orderReducer.invoice_no);
            products.map((item, index) => {
                Object.entries(item).forEach(([key, value]) => {
                    form.append(`product[${index}][${key}]`, value);
                });
            });

            post("/AddOrder", form, state.authReducer.cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(
                        Order.getLedgerDetails(
                            response,
                            state.authReducer.cookie
                        )
                    );
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(actionDispatch(ActionType.ADD_ORDER_FAIL, error));
                });
        };
    }

    /**
    |--------------------------------------------------
    | Remove Product
    |--------------------------------------------------
    */

    static removeProduct(obj) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.REMOVE_PRODUCT, obj));

            const state = getState();
            if(state.orderReducer.placedOrder.length === 0){
                dispatch(actionDispatch(
                    ActionType.REMOVE_PRODUCT_SUCCESS,
                    ""
                ));
                return 
            }
            const products = state.orderReducer.placedOrder.map(item => {
                return {
                    itemcode: item.itemCode,
                    scheme_total: item.schemeTotal,
                    qty: item.quantity,
                    scheme_desc : item.schemeItem.split(",")[0]
                };
            });

            let form = new FormData();
            form.append("entity_no", state.orderReducer.selectedCustomer.ENTITY_NO);
            products.map((item, index) => {
                Object.entries(item).forEach(([key, value]) => {
                    form.append(`product[${index}][${key}]`, value);
                });
            });

            post("/Calculatefreight", form, state.authReducer.cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    dispatch(actionDispatch(
                        ActionType.GET_FREIGHT_CALCULATION_SUCCESS,
                        response
                    ));
                    dispatch(actionDispatch(
                        ActionType.REMOVE_PRODUCT_SUCCESS
                    ));
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(
                            ActionType.GET_FREIGHT_CALCULATION_FAIL,
                            response
                        )
                    );
                    dispatch(actionDispatch(
                        ActionType.REMOVE_PRODUCT_FAIL
                    ));
                });
        };
    }

    /**
    |--------------------------------------------------
    | Get Ledger Details
    |--------------------------------------------------
    */

    static getLedgerDetails(obj, Cookie) {
        return dispatch => {
            get("/getLedgerDetails&inv_no=" + obj.inv_no, Cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    response.inv_no = obj.inv_no;
                    dispatch(
                        actionDispatch(ActionType.ADD_ORDER_SUCCESS, response)
                    );
                    Actions.orderSubmit();
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(actionDispatch(ActionType.ADD_ORDER_FAIL, error));
                });
        };
    }

    /**
    |--------------------------------------------------
    | placeConfirmOrder
    |--------------------------------------------------
    */

    static placeConfirmOrder(obj) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.PLACE_CONFIRM_ORDER));

            const state = getState();

            let form = new FormData();
            form.append("ord_no", obj.order_no);
            form.append("shipment_type", obj.shipment_type);

            post("/order", form, state.authReducer.cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    Alert.alert("Success", "Added new order Successfully", [
                        {
                            text: "OK",
                            onPress: () => {
                                Actions.previewreceipt({
                                    order_details : response.order_details,
                                    transactions : response.transactions
                                });
                                dispatch(
                                    actionDispatch(
                                        ActionType.PLACE_CONFIRM_ORDER_SUCCESS,
                                        response
                                    )
                                );
                            }
                        }
                    ]);
                })
                .catch(error => {
                    console.log("error", error);
                    dispatch(
                        actionDispatch(
                            ActionType.PLACE_CONFIRM_ORDER_FAIL,
                            error
                        )
                    );
                });
        };
    }
}
