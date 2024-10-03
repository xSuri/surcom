import * as SecureStore from 'expo-secure-store';

export function getStorage(key: string) {
    return SecureStore.getItemAsync(key);
}

export function setStorage(key: string, data: any) {
    SecureStore.setItemAsync(key, data);
}