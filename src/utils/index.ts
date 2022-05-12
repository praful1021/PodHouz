import {Alert} from 'react-native';
import {STATUS_CODES} from '../constants';
import {localStrings} from '../localization';

/** check if there is error in api */
const apiErrors = (response: any, hideToast?: boolean) => {
  if (response && response.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
    ToastMessage.showToast(response?.data?.message, localStrings.error);
  } else if (response && response.status === STATUS_CODES.UNAUTHORIZED) {
    Alert.alert(
      'Session Expired!',
      'Your session has been expired. Please login again.',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
    );
  } else if (response && response.status === STATUS_CODES.NOT_FOUND) {
    ToastMessage.showToast(response?.message, localStrings.error);
  } else if (response && response.status) {
    if (hideToast) {
      return;
    }
    ToastMessage.showToast(response?.data?.message, localStrings.error);
  }
};

class ToastMessage {
  /**
   * @method showToast
   * @description Use it to show toast. It internally uses Toast
   * @param {string} message
   * @param {string} type : possible values : default | warning | success | danger
   * @param {string} position
   */
  static showToast(message = 'Something went wrong', type = 'success') {
    if (type === 'success') {
      successToast.show(message, '3000');
    } else {
      errorToast.show(message, '3000');
    }
  }
}

export {apiErrors, ToastMessage};
