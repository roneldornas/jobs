import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

const APP_ID = '591288251225774';
//How to use AsyncStorage
//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');


export const facebookLogin = () =>  async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        //Dispatch a action saying FB login is true
        dispatch ({ type: FACEBOOK_LOGIN_SUCCESS, payload: token})
    } else {
        // Start up FB login process
        doFacebookLogin(dispatch);
    }
}

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS });
};
