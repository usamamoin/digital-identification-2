import { ActionType } from "./../actions";
import { post } from "../../utils/api-call";
import { Alert } from "react-native";
import { actionDispatch } from "../../utils/return-obj";
import { Actions } from "react-native-router-flux";

export default class DepositAction {
    /**
    |--------------------------------------------------
    | SUBMIT DEPOSIT FORM
    |--------------------------------------------------
    */
    static submitDepositForm({
        ENTITY_NO,
        imageData,
        amount,
        receipt,
        paymentType,
        collectionCenter,
        accountType,
        bank
    }) {
        return (dispatch, getState) => {
            dispatch(actionDispatch(ActionType.SUBMIT_DEPOSIT_FORM));

            const state = getState();

            let form = new FormData();
            form.append("entity_no", ENTITY_NO);
            form.append("amount", amount);
            form.append("tran_type", paymentType);
            form.append("rec_no", receipt);
            form.append("BCC_ID", bank);
            form.append("cc_id", collectionCenter);
            form.append("code", accountType);
            form.append("imageBase64", imageData.data);
            form.append("imageHeight", imageData.height);
            form.append("imageWidth", imageData.width);
            form.append("imageFormat", imageData.type);
            form.append("imageSize", imageData.fileSize);
            form.append("imageTimestamp", imageData.timestamp);

            post("/addtran", form, state.authReducer.cookie)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    const { tran_no, format, amount } = response;
                    Alert.alert(
                        "Success",
                        `Receipt : ${tran_no}\nType : ${format}\nAmount : ${amount}`,
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    Actions.reset("dashboard");
                                    dispatch(
                                        actionDispatch(
                                            ActionType.SUBMIT_DEPOSIT_FORM_SUCCESS
                                        )
                                    );
                                }
                            }
                        ]
                    );
                })
                .catch(error => {
                    Alert.alert("Error",`Receipt : ${error.receipt}`);
                    dispatch(
                        actionDispatch(ActionType.SUBMIT_DEPOSIT_FORM_FAIL)
                    );
                });
        };
    }
}
