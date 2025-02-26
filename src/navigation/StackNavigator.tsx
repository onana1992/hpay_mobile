/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import StartScreen from '../screens/StartScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import TelVerificationScreen from '../screens/signup/TelVerificationScreen';
import CountryScreen from '../screens/signup/CountryScreen';
import IdentityScreen from '../screens/signup/IdentityScreen';
import  EmailScreen  from '../screens/signup/EmailScreen';
import ParrainageScreen from '../screens/signup/ParrainageScreen';
import { useSelector} from 'react-redux';
import TabNavigator from './TabNavigator';
import PhotoProfilScreen from '../screens/signup/PhotoProfilScreen';
import RecoverScreen from '../screens/password/RecoverScreen';
import VerificationScreen from '../screens/password/VerificationScreen';
import NewPasswordScreen from '../screens/password/NewPasswordScreen';
import ProfilScreen from '../screens/ProfilScreen';
import kycScreen from '../screens/connected/KycScreen';
import { Colors } from '../themes';


const Stack = createNativeStackNavigator();

function StackNavigation() {

    const user = useSelector((state:any) => state.profil.user);

    console.log(user);


    return (
        <NavigationContainer>
            {
                user !== null ?
                    <Stack.Navigator>

                        <Stack.Screen
                            name="Tab"
                            component={TabNavigator}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="ProfilScreen"
                            component={ProfilScreen}
                            options={{
                                title: 'Profil',
                                headerShown: false,
                                headerTintColor: '#fff',
                                headerTitleAlign: 'left',
                                headerTitleStyle: {
                                },
                                headerStyle: {
                                    backgroundColor: Colors.primary,
                                },
                            }}
                        />

                         

                        <Stack.Screen
                            name="kyc"
                            component={kycScreen}
                            options={{
                                title: 'Conformite Kyc',
                                headerShown: false,
                                headerTintColor: '#fff',
                                headerTitleAlign: 'left',
                                headerTitleStyle: {
                                },
                                headerStyle: {
                                    backgroundColor: Colors.primary,
                                },
                            }}
                        />
                    </Stack.Navigator>

                    :

                    <Stack.Navigator>
                        
                       {/*<Stack.Screen
                            name="StartPage"
                            component={StartScreen}
                            options={{ headerShown: false }}
                       />*/}

                      
                       <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{ headerShown: false }}
                        />


                        <Stack.Screen
                            name="CountryScreen"
                            component={CountryScreen}
                            options={{ headerShown: false }}
                        />
                        

                        <Stack.Screen
                            name="SignUp"
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />



                       <Stack.Screen
                            name="TelVerification"
                            component={TelVerificationScreen}
                            options={{ headerShown: false }}
                        />


                       
                        <Stack.Screen
                            name="Identity"
                            component={IdentityScreen}
                            options={{ headerShown: false }}
                        />

                        
                        <Stack.Screen
                                name="Email"
                                component={EmailScreen}
                                options={{ headerShown: false }}
                        />

                        
                        <Stack.Screen
                            name="PhotoScreen"
                            component={PhotoProfilScreen}
                            options={{ headerShown: false }}
                        />


                        <Stack.Screen
                            name="Recover"
                            component={RecoverScreen}
                            options={{ headerShown: false }}
                        />


                        <Stack.Screen
                            name="Verification"
                            component={VerificationScreen}
                            options={{ headerShown: false }}
                        />


                        <Stack.Screen
                            name="NewPassword"
                            component={NewPasswordScreen}
                            options={{ headerShown: false }}
                        />


                        <Stack.Screen
                            name="ParrainageScreen"
                            component={ParrainageScreen}
                            options={{ headerShown: false }}
                        />
                        
                    </Stack.Navigator>
            }
            
        </NavigationContainer>
    );
}

export default StackNavigation;