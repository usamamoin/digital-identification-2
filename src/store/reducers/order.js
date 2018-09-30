import forEach from "lodash/forEach";
import { ActionType } from "./../actions";

const initialState = {
    customers: [],
    isLoading: false,
    flavours: [],
    packs: [],
    scheme: {
        showScheme: false,
        items: [
            [
                "",
                {
                    ITEM_CODE: "",
                    ITEM_NAME: ""
                }
            ]
        ],
        schemeTotal: "",
        scheme_no: "",
        productAmount: ""
    },
    placedOrder: [],
    freight: {
        freight_total: 0,
        freight_percentage: 0,
        entity_freight: 0,
        load: ""
    },
    invoice_no: "",
    ledgerDetails: {
        orderinfo: {
            ORD_SR: "",
            ENTITY_NAME: "",
            TOWN: "",
            ORD_DATE: ""
        },
        ttypes: []
    },
    selectedCustomer: {
        AREA: "",
        ENTITY_NAME: "",
        ENTITY_NO: "",
        Key: ""
    },
    deposit: {
        banks: [],
        codes: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GET_CUSTOMERS:
            return { ...initialState, isLoading: true };

        case ActionType.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload.customers,
                deposit: {
                    ccenter: action.payload.ccenter,
                    bcenter: action.payload.bcenter,
                    ctypes: action.payload.ctypes,
                    codes: action.payload.codes,
                    banks: action.payload.banks
                },
                isLoading: false
            };

        case ActionType.GET_CUSTOMERS_FAIL:
            return { ...state, isLoading: false };

        case ActionType.GET_FLAVOURS_PACKS:
            return { ...state, isLoading: true };

        case ActionType.GET_FLAVOURS_PACKS_SUCCESS:
            return {
                ...state,
                packs: Object.entries(action.payload).map(d => {
                    return {
                        CLS_DESC: d[1].CLS_DESC,
                        CLS_ID: d[1].CLS_ID
                    };
                }),
                flavours: action.payload,
                isLoading: false
            };

        case ActionType.GET_FLAVOURS_PACKS_FAIL:
            return { ...state, isLoading: false };

        case ActionType.GET_QUANTITY_SCHEME:
            return { ...state, isLoading: true };

        case ActionType.GET_QUANTITY_SCHEME_SUCCESS:
            return {
                ...state,
                scheme: {
                    showScheme: true,
                    items: Object.entries(
                        action.payload.order_type.return[1].ITEMS
                    ),
                    productAmount: action.payload.order_type.return[0].DISRATE,
                    schemeTotal: action.payload.order_type.return[1].S_TYPE
                },
                isLoading: false
            };

        case ActionType.GET_QUANTITY_SCHEME_FAIL:
            return { ...state, isLoading: false };

        // Save just locally

        case ActionType.SAVE_PLACED_ORDER_SUCCESS:
            const placedOrder = [...state.placedOrder];
            action.payload.placedOrder.index >= 0
                ? (placedOrder[action.payload.placedOrder.index] =
                      action.payload.placedOrder)
                : placedOrder.push(action.payload.placedOrder);
            return {
                ...state,
                placedOrder,
                selectedCustomer: action.payload.selectedCustomer,
                scheme: {
                    showScheme: false,
                    items: [
                        [
                            "",
                            {
                                ITEM_CODE: "",
                                ITEM_NAME: ""
                            }
                        ]
                    ],
                    schemeTotal: "",
                    scheme_no: "",
                    productAmount: ""
                }
            };

        case ActionType.GET_FREIGHT_CALCULATION:
            return { ...state, isLoading: true };

        case ActionType.GET_FREIGHT_CALCULATION_SUCCESS:
            return { ...state, freight: action.payload, isLoading: false };

        case ActionType.GET_FREIGHT_CALCULATION_FAIL:
            return { ...state, isLoading: false };

        case ActionType.ADD_ORDER:
            return { ...state, isLoading: true };

        case ActionType.ADD_ORDER_SUCCESS:
            return {
                ...state,
                invoice_no: action.payload.inv_no,
                ledgerDetails: action.payload,
                isLoading: false
            };

        case ActionType.ADD_ORDER_FAIL:
            return { ...state, isLoading: false };

        case ActionType.PLACE_CONFIRM_ORDER:
            return { ...state, isLoading: true };

        case ActionType.PLACE_CONFIRM_ORDER_SUCCESS:
            return { ...initialState, isLoading: false };

        case ActionType.PLACE_CONFIRM_ORDER_FAIL:
            return { ...state, isLoading: false };

        case ActionType.REMOVE_PRODUCT:
            const placedOrderAfterRemove = [...state.placedOrder];
            placedOrderAfterRemove.splice(action.payload.index, 1);
            return {
                ...state,
                placedOrder: placedOrderAfterRemove,
                isLoading: true
            };

        case ActionType.REMOVE_PRODUCT_SUCCESS:
            return { ...state, isLoading: false };

        case ActionType.REMOVE_PRODUCT_FAIL:
            return { ...state, isLoading: false };

        case ActionType.RESET_PRODUCT_LIST:
            return { ...state, placedOrder: [] };

        case ActionType.EDIT_REPORT_SUCCESS_ORDER:
            let placedOrderArray = [];
            forEach(action.payload.placedOrder, value => {
                placedOrderArray.push(value);
            });
            return {
                ...state,
                selectedCustomer: action.payload.selectedCustomer,
                placedOrder: placedOrderArray,
                invoice_no: action.payload.ord_no,
                isLoading: false
            };

        default:
            return state;
    }
};
