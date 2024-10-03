import EncryptedStorage from 'react-native-encrypted-storage';


export function getStorage(key: string) {
    return EncryptedStorage.getItem(key);
}

export function setStorage(key: string, data: any) {
    EncryptedStorage.setItem(
        key,
        JSON.stringify({
            token: data,
        })
    );
}