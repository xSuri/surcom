import Toast from 'react-native-toast-message';

export default function showAlert({ alertType, alertTitle, alertBody }: any) {
    return new Promise<void>(function (resolve, reject) {
        Toast.show({
            type: alertType,
            text1: alertTitle,
            text2: alertBody,
            visibilityTime: 4000,
        });
    })

};

export const ALERT_TYPES = {
    'DANGER': 'error',
    'SUCCESS': 'success'
};