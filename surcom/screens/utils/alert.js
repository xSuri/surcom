import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function showAlert({ alertType, alertTitle, alertBody }) { //ALERT_TYPE.SUCCESS
    return new Promise(function (resolve, reject) {
        Dialog.show({
            type: alertType,
            title: alertTitle,
            textBody: alertBody,
            button: 'close',
            onHide: resolve,
        })
    })

};

export const ALERT_TYPES = ALERT_TYPE;