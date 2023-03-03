import 'react-native-gesture-handler';
import React from 'react';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import Main from './screens/Main';
import LoginPage from './screens/Login';
import RegisterPage from './screens/Register';
import HomePage from './screens/Home';
import Room from './screens/Room';

const Stack = createStackNavigator();

const App = ({ store }) => {
    return (
        <AlertNotificationRoot>
            <NavigationContainer>
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
                                    initialRouteName
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
                            </>
                        )
                    }

                </Stack.Navigator>
            </NavigationContainer>
        </AlertNotificationRoot>
    );
};

const mapStateToProps = state => ({
    store: state.user
});

export default connect(
    mapStateToProps,
)(App);
