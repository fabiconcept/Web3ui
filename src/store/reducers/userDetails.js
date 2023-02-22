import { userDetailsAction } from "../slices/userDetails";

export const getDataFromLogin = (data) =>{
    const coinInfo = data.coinInfo;
    const userInfo = data.userInfo;

    return async(dispatch) =>{
        dispatch(userDetailsAction.getUserData({details: userInfo, coinbase: coinInfo, pending: false, error: null}));
    }
}