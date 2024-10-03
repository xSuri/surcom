import 'react-native-gesture-handler';
import React from 'react';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Toast from 'react-native-toast-message';

import Main from './screens/Main';
import LoginPage from './screens/Login';
import RegisterPage from './screens/Register';
import HomePage from './screens/Home';
import Room from './screens/Room';
import Settings from './screens/modals/Settings';
import UserInfo from './screens/modals/User-Info';
import ImageSend from './screens/modals/Image-Send';
import ImageShower from './screens/modals/Image-Shower';

const Stack = createStackNavigator();

const App = ({ store }: any): any => {
    return (
        <>
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    {
                        store.isSignout ? (
                            <>
                                <Stack.Screen
                                    name="LoginAndRegister"
                                    component={Main}
                                    options={{
                                        title: 'Login Panel',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name="Login"
                                    component={LoginPage}
                                    options={{
                                        title: 'Login',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name="Register"
                                    component={RegisterPage}
                                    options={{
                                        title: 'Register',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <Stack.Screen
                                    name="Home"
                                    component={HomePage}
                                    options={{
                                        title: 'Home',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name="Room"
                                    component={Room}
                                    options={{
                                        title: '',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name="Settings"
                                    component={Settings}
                                    options={{
                                        title: '',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name="UserInfo"
                                    component={UserInfo}
                                    options={{
                                        title: '',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name="ImageSend"
                                    component={ImageSend}
                                    options={{
                                        title: '',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />

                                <Stack.Screen
                                    name="ImageShower"
                                    component={ImageShower}
                                    options={{
                                        title: '',
                                        headerStyle: {
                                            backgroundColor: 'black',
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />
                            </>
                        )
                    }

                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </>
    );
};

const mapStateToProps = (state: { user: any; }) => ({
    store: state.user
});

export default connect(
    mapStateToProps,
)(App);
